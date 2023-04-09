import axios, {AxiosInterceptorOptions, AxiosRequestConfig} from "axios";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import {User} from "../models/user";
import {Tokens} from "../models/tokens";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";


const baseURL ='http://localhost:8000'

const useAxios=()=>{

    const {authTokens, setUser, setAuthTokens, refreshTokenExpired}=useContext(AuthContext)

    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL:baseURL,
        headers:{
            Authorization:`Bearer ${authTokens?.access}`
        }
    })

    axiosInstance.interceptors.request.use(
        async (request)=>{

            const user = jwtDecode(authTokens?.access) as User
            const isExpired:boolean = dayjs.unix(user.exp).diff(dayjs())<1
            if(isExpired){
                if(refreshTokenExpired()){
                    navigate("/login")
                    return request;
                }

                const response = await axios.post<Tokens>(
                    `${baseURL}/api/token/refresh/`,{
                        refresh:authTokens.refresh
                    }
                )

                localStorage.setItem("authTokens", JSON.stringify(response.data))
                request.headers.Authorization=`Bearer ${response.data.access}`
                setAuthTokens(response.data)
                setUser(jwtDecode(response.data.access) as User)
            }

            return request
        }
    )
    return axiosInstance
}

export default useAxios