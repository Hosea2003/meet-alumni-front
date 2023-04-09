import React, {useContext, useState} from 'react';
import '../assets/style/UserCard.css'
import PrimaryButton from "./PrimaryButton";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import {PublicUser} from "../models/user";
import {BACK_BASE_URL} from "../data/data";
import {useNavigate} from "react-router-dom";

type UserCardProps={
    userId:number,
    isAlumni?:boolean,
    name:string,
    mutualFriends:number
    isFriend:boolean
    profilePicture:string
    isRequest:boolean
    hasRequested?:boolean
}

type FriendStateProps={
    isFriend:boolean,
    isRequest:boolean
    hasRequested:boolean
}
function UserCard(props:UserCardProps) {

    const [friendState, setFriendState]=useState<FriendStateProps>({
        isFriend:props.isFriend, isRequest:props.isRequest, hasRequested:props.hasRequested?props.hasRequested:false
    })

    const api =useAxios()

    const navigate= useNavigate()

    async function sendRequest() {
        const response = await api.patch<PublicUser>(
            BACK_BASE_URL+"/people/send-friend-request/"+props.userId
        )

        setFriendState({...friendState, hasRequested:true})
    }

    async function acceptRequest(){
        const response = await api.patch<PublicUser>(
            BACK_BASE_URL+"/people/accept-request/"+props.userId
        )

        setFriendState({...friendState, isFriend:true})
    }

    function goToMessage() {
        navigate("/message/"+props.userId)
    }

    function viewProfile() {
        navigate("/profile/"+props.userId)
    }

    return (
        <div className={"user-card"}>
            <div className="picture-container">
                <div className="border">
                    <div className="same-color">
                        <img src={props.profilePicture} alt=""/>
                    </div>
                </div>
            </div>
            <h2 className="name">{props.name}</h2>
            <span>{props.mutualFriends} mutual friend</span>
            <div className="buttons">
                {friendState.hasRequested && !friendState.isFriend &&(
                    <PrimaryButton disabled={true} className={"view-profile"}>Request sent</PrimaryButton>
                )}
                {!friendState.isFriend && !friendState.isRequest &&!friendState.hasRequested && (
                    <PrimaryButton onClick={()=>sendRequest()}>Add Friend</PrimaryButton>
                )}
                {!friendState.isFriend && friendState.isRequest && (
                    <PrimaryButton onClick={()=>acceptRequest()}>Confirm</PrimaryButton>
                )}
                {friendState.isFriend && !friendState.isRequest &&(
                    <PrimaryButton onClick={()=>goToMessage()}>Message</PrimaryButton>
                )}
                <PrimaryButton className="view-profile"
                    onClick={()=>viewProfile()}>View Profile</PrimaryButton>
            </div>
        </div>
    );
}

export default UserCard;