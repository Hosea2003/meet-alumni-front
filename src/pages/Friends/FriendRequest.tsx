import React, {useEffect, useState} from 'react';
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {UserRequestType} from "../UserRequest/UserRequestItem";
import {BACK_BASE_URL} from "../../data/data";
import useAxios from "../../hooks/useAxios";
import {infiniteScrolling} from "../../utils/InfiniteScrolling";
import UserCard from "../../components/UserCard";
import {PublicUser} from "../../models/user";

function FriendRequest() {

    const initalLink= BACK_BASE_URL+"/people/friends-request"

    const [requests, setRequests]=useState<PublicUser[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        async function fetchRequest(){
            const response =await api.get<PaginatedResponse<PublicUser>>(
                nextLink
            )

            setLink(response.data.next)
            setRequests(response.data.results)
        }
        fetchRequest()
    }, [nextLink])

    useEffect(()=>{
        const handleScoll=(event:Event)=> {
            infiniteScrolling(()=>link && setLink(link))
        }
        window.addEventListener("scroll", handleScoll)

        return ()=>window.removeEventListener("scroll", handleScoll)
    })


    return (
        <div className={"friend-request"}>
            <h1>Friend Request</h1>
            <div className="display-friends">
                {requests.map((friendRequest, index)=>(
                    <UserCard
                        isFriend={false}
                        isRequest ={true}
                        mutualFriends={friendRequest.mutual_friends}
                        name={friendRequest.name}
                        profilePicture={BACK_BASE_URL+"/"+friendRequest.profile_picture}
                        userId={friendRequest.id}
                        key={index}/>
                ))}
            </div>
        </div>
    );
}

export default FriendRequest;