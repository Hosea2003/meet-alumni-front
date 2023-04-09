import React, {useEffect, useState} from 'react';
import '../../assets/style/CollegeMembers.css'
import RadioGroup from "../../components/RadioGroup";
import RadioButton from "../../components/RadioButton";
import UserCard from "../../components/UserCard";
import {BACK_BASE_URL} from "../../data/data";
import {PublicUser} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {infiniteScrolling} from "../../utils/InfiniteScrolling";


type CollegeMemberProps={
    collegeId:number
}

interface Member{
    id:number
    isAlumni:boolean
    user:PublicUser
}

function CollegeMember(props:CollegeMemberProps) {

    const initialLink=BACK_BASE_URL+"/people/college-members/"+props.collegeId

    const [nextLink, setNextLink]=useState<string>(
        BACK_BASE_URL+"/people/college-members/"+props.collegeId
    )
    const [link, setLink]=useState<string|null>()
    const [members, setMembers]=useState<Member[]>([])

    const [search, setSearch]=useState<string>("all")

    const api = useAxios()

    async function fetchMember(){
        const response = await api.get<PaginatedResponse<Member>>(
            nextLink,{
                params:{
                    search:search
                }
            }
        )
        if(nextLink==initialLink)setMembers(response.data.results)
        else setMembers(prev=>[...prev, ...response.data.results])
        console.log(response.data.results)
        setLink(response.data.next)
    }

    useEffect(()=>{
        fetchMember()
    },[nextLink, search])

    useEffect(()=>{
        const handleScroll=(event:Event)=>{
            infiniteScrolling(()=>link&& setNextLink(link))
        }
        window.addEventListener("scroll", handleScroll)
        return ()=> window.removeEventListener("scroll", handleScroll)
    })

    return (
        <div className={"college-members"}>
            <h2>Members</h2>
            <div className="filter">
                <RadioGroup defaultValue={"all"} onChange={(value)=>{
                    setNextLink(BACK_BASE_URL+"/people/college-members/"+props.collegeId)
                    setSearch(value)
                    }
                }>
                    <RadioButton value={"all"}>All</RadioButton>
                    <RadioButton value={"alumni"}>Alumni</RadioButton>
                    <RadioButton value={"student"}>Student</RadioButton>
                </RadioGroup>
            </div>
            <div className="members-list">
                {members.map((member, index)=>(
                    <UserCard
                        isFriend={member.user.is_friend}
                        isRequest={member.user.has_requested}
                        mutualFriends={member.user.mutual_friends}
                        name={member.user.name}
                        profilePicture={BACK_BASE_URL+member.user.profile_picture}
                        userId={member.user.id}
                        key={index}
                        hasRequested={member.user.have_requested}/>

                ))}
            </div>
        </div>
    );
}

export default CollegeMember;