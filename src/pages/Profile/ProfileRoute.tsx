import React, {useContext} from 'react';
import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import '../../assets/style/Profile.css'
import Tab from "../../components/Tab";
import TabItem from "../../components/TabItem";
import userImg from '../../assets/images/user.png'
import AuthContext from "../../context/AuthContext";

function ProfileRoute() {

    const {user}= useContext(AuthContext)

    const {id}=useParams()

    return (
        <div className={"profile-route"}>
            <div className="wrapper">
                <div className="profile-navigation">
                    <div className="profile-picture">
                        <img src={userImg} alt=""/>
                        <div className="text">
                            <h2>{"Rindra hosea"}</h2>
                            {user.id==+id! &&(
                                <Link to={"update"} className={"edit"}>
                                    Edit Profile
                                </Link>
                            )}
                        </div>
                    </div>
                    <Tab selectedPath={"selected"}>
                       <TabItem text={"Information"} to={""}/>
                        <TabItem text={"Album"} to={"album"}/>
                        <TabItem text={"Friends"} to={"friends"}/>
                    </Tab>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default ProfileRoute;