import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

function PrivateRoute():React.ReactElement{
    const {refreshTokenExpired} =useContext(AuthContext);

    // if(!user)return <Navigate to={{pathname:"/login"}}/>
    //
    // return children


    return !refreshTokenExpired()?
        <div className={"private-route-container"}>
            <div className="header">
                <Navbar/>
            </div>
            <Outlet/>
        </div>:
        <Navigate to={"/login"}/>
}

export default PrivateRoute