import React, {createContext, useState, useEffect, FormEvent} from 'react'
import {User} from "../models/user";
import {AccessTokens, RefreshTokens, Tokens} from "../models/tokens";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from "../utils/AxiosInstance";
import {BACK_BASE_URL} from "../data/data";


const AuthContext=createContext<any>({})

type loginInput={
    email:string,
    password:string
}

export default AuthContext

export const AuthProvider =({children}:any)=>{

    let defaultTokens=localStorage.getItem("authTokens")

    const [authTokens, setAuthTokens]=useState<Tokens|undefined|null>(()=>
    {
        return defaultTokens?JSON.parse(defaultTokens) as Tokens:null
    })
    const [user, setUser]=useState<User|null|undefined>(()=>{
        const tokens= defaultTokens?JSON.parse(defaultTokens) as Tokens:null
        return tokens?jwtDecode(tokens.access) as User:null
    })

    // const [loading, setLoading]=useState(true)
    const navigate=useNavigate()

    const loginUser=async ({email, password}:loginInput)=>{

        try{
            const {data, status}=await axios.post<Tokens>(
                "http://localhost:8000/api/token/",
                {
                    email:email, password:password
                },
                {
                    headers:{
                        'Content-Type':'application/json',
                        Accept:'application/json'
                    }
                }
            )

            if(status===200){
                setAuthTokens(data)
                localStorage.setItem("authTokens", JSON.stringify(data))
                localStorage.setItem("current_timestamp", Date.now().toString())
                const user = jwtDecode(data.access) as User
                setUser(user)
                navigate("/")
            }

        }catch (error:any){
            if(axios.isAxiosError(error)){
                console.log(error.message)
            }
        }

    }

    const logOut=()=>{
        setUser(null)
        setAuthTokens(null)
        localStorage.removeItem("current_timestamp")
        navigate("/login")
    }

    const refreshTokenExpired=():boolean=>{

        if(!authTokens)return true

        const refreshToken=jwtDecode(authTokens.refresh) as RefreshTokens
        const isExpired = dayjs.unix(refreshToken.exp).diff(dayjs()) <1

        return isExpired
    }

    const authContextData={
        loginUser:loginUser,
        user:user,
        setUser:setUser,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        refreshTokenExpired,
        logOut
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}