import React, {FormEvent, useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {BACK_BASE_URL} from "../../data/data";
import useAxios from "../../hooks/useAxios";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {infiniteScrolling, infiniteScrollingRef} from "../../utils/InfiniteScrolling";
import MessageItem from "./MessageItem";
import '../../assets/style/Message.css'
import SendInput from "../../components/SendInput";
import AuthContext from "../../context/AuthContext";


type Message={
    content:string
    sender:number
    receiver:number
}

type Person={
    profile_picture:string
    first_name:string
    last_name:string
}

function MessageBody() {

    const {id}=useParams()
    const {user}=useContext(AuthContext)

    const initalLink= BACK_BASE_URL+"/message/"+id

    const [messages, setMessages]=useState<Message[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    const listRef = useRef<HTMLDivElement>(null)

    const [person, setPerson]=useState<Person>()

    useEffect(()=>{
        async function fetchPerson(){
            const response = await api.get<Person>(
                BACK_BASE_URL+"/user/details/"+id
            )
            setPerson(response.data)
        }
        fetchPerson()
    })

    useEffect(()=>{
        async function fetchMessage(){
            const response =await api.get<PaginatedResponse<Message>>(
                nextLink
            )

            setMessages([...messages, ...response.data.results])
            setLink(response.data.next)
        }
        fetchMessage()
    }, [nextLink])

    function handleScroll(){
        const scrollHeight = listRef.current?.scrollHeight
        const scrollTop =listRef.current?.scrollTop
        const scroll=scrollHeight!-listRef.current!.clientHeight

        if(scroll && scrollTop && (scrollTop*-1)+1>=scroll){
            link && setNextLink(link)
        }
    }

    async function sendMessage(event:FormEvent) {
        event.preventDefault()
        const target= event.target as typeof event.target &{
            message:{value:string}
        }
        const response = await api.post<Message>(
            BACK_BASE_URL+"/message/send-message/"+id,{
                message:target.message.value
            }
        )

        setMessages([response.data, ...messages])
    }

    return (
        <div className={"chat"}>
            <div className="chat-header">
                <img src={BACK_BASE_URL+ person?.profile_picture} alt=""/>
                <h3>{person?.first_name} {person?.last_name}</h3>
            </div>
            <div className={"message-body"} onScroll={handleScroll} ref={listRef}>
                {messages.map((message, index)=>(
                    <MessageItem content={message.content} direction={message.sender==user.id?"right":"left"}
                                 key={index}/>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <SendInput name={"message"}/>
            </form>
        </div>
    );
}

export default MessageBody;