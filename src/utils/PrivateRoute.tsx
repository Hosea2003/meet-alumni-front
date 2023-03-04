import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";


function PrivateRoute({element, children, ...rest}:any){
    const {user} =useContext(AuthContext);

    if(!user)return <Navigate to={{pathname:"/login"}}/>

    return children
}

export default PrivateRoute