import React, {useContext} from 'react';
import {dateDiff} from "../../utils/DateDiff";
import MessageContext from "../../context/MessageContext";
import {Link} from "react-router-dom";

type UserListItemProps={
    profilePicture:string,
    name:string,
    lastMessage:string
    dateLastMessage:Date
    lastSenderMe:boolean
    selectedId:number
    userId:number
}

function UserListItem(props:UserListItemProps) {

    const {searchParams}=useContext(MessageContext)

    const selectedId = searchParams.get('id')?searchParams.get('id'):0

    return (
        <Link to={props.userId.toString()} style={{textDecoration:"none"}}>
            <div className={`user-list-item ${props.userId==selectedId?"active":""}`}>
                <div className="image-container">
                    <img src={props.profilePicture} alt=""/>
                </div>
                <div className="text">
                    <span className={"name"}>{props.name}</span>
                    <div className="message-detail">
                        <span>{props.lastSenderMe?"You: ":""}{props.lastMessage}</span>
                        {dateDiff(props.dateLastMessage)}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default UserListItem;