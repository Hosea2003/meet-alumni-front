import React, {FormEvent, useContext, useEffect, useState} from 'react';
import UserRequestItem, {UserRequestType} from "./UserRequestItem";
import AuthContext from "../../context/AuthContext";
import '../../assets/style/UserRequest.css'
import SearchInput from "../../components/SearchInput";
import useAxios from "../../hooks/useAxios";
import * as repl from "repl";
import {BACK_BASE_URL} from "../../data/data";


interface Response{
    next:string|null,
    results:UserRequestType[]
}

function UserRequest() {

    const [search, setSearch]=useState('')
    const [listRequest, setListRequest]=useState<UserRequestType[]>()
    const [canNext, setCanNext]=useState<boolean>()
    const [page, setPage]=useState(1)
    const api = useAxios()

    useEffect(()=>{
        const fetchRequest=async ()=>{
            const response= await api.get<Response>(
                "/user/request-college",{
                    params:{
                        name:search,
                        page:page
                    }
                }
            )

            setListRequest(prevState => {

                if(search)
                    return response.data.results

                const data:UserRequestType[]= response.data.results
                if(prevState)return [...prevState, ...data]
                return data
            })

            setCanNext(response.data.next?true:false)
        }
        fetchRequest()
    }, [page, search])

    useEffect(()=>{
        const handleScroll=(event:Event)=>{
            const scrollHeight=document.documentElement?.scrollHeight || 0
            const currentHeight=document.documentElement.scrollTop + window.innerHeight
            // console.log(scrollHeight, currentHeight)

            if(currentHeight+1 >= scrollHeight && canNext){
                setPage(prev=>prev+1)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return ()=> window.removeEventListener("scroll", handleScroll)
    })


    function searchRequest(event:FormEvent){
        event.preventDefault()
        const target = event.target as typeof event.target & {
            name:{value:string}
        }
        setSearch(target.name.value)
    }

    return (
        <div className={"user-request"}>
            <div className="wrapper">
                <form onSubmit={searchRequest}>
                    <SearchInput name={"name"}/>
                </form>

                <div className="requests">
                    {listRequest?.map((req, index)=>(
                        <UserRequestItem
                            date={new Date(req.dateRequested)}
                            firstName={req.first_name}
                            lastName={req.last_name}
                            image={BACK_BASE_URL+req.image}
                            gender={req.gender}
                             isAlumni={req.isAlumni}
                            key={index}
                            requestId={req.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserRequest;