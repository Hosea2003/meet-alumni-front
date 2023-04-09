import axios from "axios";

const baseURL ='http://localhost:8000'

const axiosInstance = axios.create({
    baseURL:baseURL,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
})

export default axiosInstance