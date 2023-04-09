import React, {ReactNode, useContext} from 'react';
import ImageButton from "./ImageButton";
import home from '../assets/images/home.png'
import message from '../assets/images/message.png'
import friends from '../assets/images/friends.png'
import userRequest from '../assets/images/user_request.png'
import college from '../assets/images/college.png'
import AuthContext from "../context/AuthContext";
import PrimaryButton from "./PrimaryButton";
import {Link} from "react-router-dom";
import '../assets/style/Navbar.css'
import {BACK_BASE_URL} from "../data/data";

function Navbar() {

    const {user, logOut}=useContext(AuthContext)

    return (
        <div className={"navbar"}>
            <div className="left">
                <Link to={"/profile/"+user.id} style={{textDecoration:'none'}}>
                    <div className="profile">
                        <img src={`${BACK_BASE_URL}${user.profile_picture}`} alt={user.profile_picture}/>
                        <h4>{user.first_name+" "+user.last_name}</h4>
                    </div>
                </Link>
            </div>
            <div className="buttons">
                <Link to={"/"}>
                    <ImageButton image={home}/>
                </Link>
                <Link to={"/message"}>
                    <ImageButton image={message}/>
                </Link>
                {!user.isAdminCollege && (
                    <Link to={"/friends"}>
                        <ImageButton image={friends}/>
                    </Link>)}
                {user.isAdminCollege && (
                    <Link to={"/request"}>
                        <ImageButton image={userRequest}/>
                    </Link>)}
                <Link to={'/college'}>
                    <ImageButton image={college}/>
                </Link>
                <PrimaryButton onClick={()=>logOut()}>Log out</PrimaryButton>
            </div>
        </div>
    );
}

export default Navbar;