import React, {ReactNode, useState} from 'react';
import {Link} from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import '../../assets/style/FriendLink.css'

type FriendLinkProp={
    children?:ReactNode
    to:string
    image:string
    selected:number
    index:number
    onSelect:()=>void
}

function FriendLink(props:FriendLinkProp) {


    return (
        <Link to={props.to} style={{textDecoration:"none", display:"flex"}}
        onClick={()=>props.onSelect()}>
            <PrimaryButton className={`friend-link ${props.index==props.selected?"selected":""}`}>
                <img src={props.image} alt=""/>
                {props.children}
            </PrimaryButton>
        </Link>
    );
}

export default FriendLink;