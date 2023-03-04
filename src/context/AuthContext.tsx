import React, {createContext, useState, useEffect, FormEvent} from 'react'
import {User} from "../models/user";
import {Tokens} from "../models/tokens";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

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
    const [user, setUser]=useState<User|undefined|null>(()=>{
        return defaultTokens?jwtDecode(JSON.parse(defaultTokens).access):null
    })

    const [loading, setLoading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{

        const fourMinutes=1000*60*4

        let interval=setInterval(async ()=>{
            if(authTokens)await updateTokens()
        }, fourMinutes)
        return ()=>clearInterval(interval)
    }, [authTokens, loading])

    const loginUser=async ({email, password}:loginInput)=>{

        const response = fetch("http://localhost:8000/api/token/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email, password:password})
        }).then(response=>{
            if(response.status===200){
                const data=response.json() as unknown as Tokens
                return data
            }
            else{
            //     show something else
            }
        }).then(tokens =>{
            localStorage.setItem("authTokens", JSON.stringify(tokens))
            setAuthTokens(tokens)
            if (tokens?.access != null) {
                const access=jwtDecode(tokens?.access) as User
                setUser(access)
            }
            navigate("/")
        })
    }

    const updateTokens= async()=>{
        fetch("http://localhost:8000/api/token/refresh/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        }).then(response=>{
            if(response.status===401){
            //     Unauthorized
                setUser(null)
                setAuthTokens(null)
                navigate('/login')
            }
            else{
                const tokens = response.json() as unknown as Tokens
                return tokens
            }
        }).then(tokens=>{
            setAuthTokens(tokens)
        })
    }

    const authContextData={
        loginUser:loginUser,
        user:user
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}