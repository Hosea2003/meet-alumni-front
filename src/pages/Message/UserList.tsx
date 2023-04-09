import React, {useEffect, useRef, useState} from 'react';
import '../../assets/style/UserList.css'
import AutoComplete from "../../components/AutoComplete";
import UserListItem from "./UserListItem";
import pf from '../../assets/images/user.png'
import {infiniteScrollingRef} from "../../utils/InfiniteScrolling";
import {User} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import {BACK_BASE_URL} from "../../data/data";
import {PaginatedResponse} from "../../models/PaginatedResponse";

type UserMessage={
    first_name:string
    last_name:string
    profile_picture:string
    id:number
}

type UserItem={
    content:string
    dateSend:Date
    friend:UserMessage
    lastSenderMe:boolean
}

function UserList() {

    const listRef = useRef<HTMLDivElement>(null)
    const initalLink= BACK_BASE_URL+"/message/last-message"

    const [users, setUsers]=useState<UserItem[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        async function loadUsers(){
            const response =await api.get<PaginatedResponse<UserItem>>(
                nextLink
            )
            setUsers([...users, ...response.data.results])
            setLink(response.data.next)
        }
        loadUsers()
    },[nextLink])

    function handleScroll(){
        infiniteScrollingRef(listRef, ()=>link && setNextLink(link))
    }

    return (
        <div className={"user-list"} id={"message-left-side"}>
            <div className="user-list-header">
                <h1>Chat</h1>
            </div>
            <div className="search">
                <AutoComplete/>
            </div>
            <div className="list" ref={listRef} onScroll={handleScroll}>
                {users.map((friend, index)=>(
                    <UserListItem
                        dateLastMessage={new Date(friend.dateSend)}
                        lastMessage={friend.content}
                        lastSenderMe={friend.lastSenderMe}
                        name={friend.friend.first_name+" "+friend.friend.last_name}
                        profilePicture={BACK_BASE_URL+ friend.friend.profile_picture}
                        userId={friend.friend.id}
                        selectedId={0} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default UserList;