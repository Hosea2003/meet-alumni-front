import React, {useContext} from 'react';
import {Link, Navigate, Outlet, useParams} from "react-router-dom";
import Tab from "../../components/Tab";
import TabItem from "../../components/TabItem";
import AuthContext from "../../context/AuthContext";
import '../../assets/style/Update.css'

function UpdateRoute() {

    const {user}=useContext(AuthContext)

    const {id}=useParams()

    console.log(id)

    return user.id==+id!? (
        <div className={"profile-route"}>
            <div className="wrapper">
                <div className="profile-navigation">
                    <Tab selectedPath={"selected"}>
                        <TabItem text={"Information"} to={""}/>
                        <TabItem text={"Change password"} to={"change-password"}/>
                    </Tab>
                </div>
                <Outlet/>
            </div>
        </div>
):<Navigate to={"/profile/"+id}/> ;
}

export default UpdateRoute;