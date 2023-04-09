import React, {useContext, useEffect, useState} from 'react';
import {BACK_BASE_URL} from "../../data/data";
import {PublicUser} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {infiniteScrolling} from "../../utils/InfiniteScrolling";
import UserCard from "../../components/UserCard";
import AuthContext from "../../context/AuthContext";

type FriendsListProps={
    userId?:number
}

function FriendsList(props:FriendsListProps) {

    const {user}=useContext(AuthContext)

    const initalLink= BACK_BASE_URL+"/people/friends/"+(props.userId?props.userId:user.id)

    const [friends, setFriends]=useState<PublicUser[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        const fetchFriends= async ()=>{
            const response = await api.get<PaginatedResponse<PublicUser>>(
                nextLink
            )

            setLink(response.data.next)
            setFriends(prev=>[...prev, ...response.data.results])
        }
        fetchFriends()
    }, [nextLink])

    useEffect(()=>{
        const handleScroll=()=>{
            infiniteScrolling(()=>link && setNextLink(link))
        }
        window.addEventListener("scroll", handleScroll)

        return ()=>window.removeEventListener("scroll", handleScroll)
    },[])

    return (
        <div className={"friends-list"}>
            <h1>Friends</h1>
            <div className="display-friends">
                {friends.map((friend, index)=>(
                    <UserCard
                        isFriend={true}
                         isRequest={false}
                         mutualFriends={friend.mutual_friends}
                         name={friend.name}
                         profilePicture={BACK_BASE_URL+ friend.profile_picture}
                     userId={friend.id}
                        key={index}/>
                ))}
            </div>
        </div>
    );
}

export default FriendsList;