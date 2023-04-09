import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import ProfileRoute from "./ProfileRoute";
import Info from "./Info";
import Album from "./Album";
import FriendsList from "../Friends/FriendsList";
import UpdateRoute from "./UpdateRoute";
import UpdateInfo from "./UpdateInfo";
import ChangePassword from "./ChangePassword";


function ProfilePage() {

    const {id}=useParams()

    return (
        <div className={"profile"}>
            <Routes>
                <Route path={""} element={<ProfileRoute/>}>
                    <Route path={""} element={<Info/>}/>
                    <Route path={"album"} element={<Album/>}/>
                    <Route path={"friends"} element={<FriendsList userId={+id!}/>}/>
                </Route>
                <Route path={"update"} element={<UpdateRoute/>}>
                    <Route path={""} element={<UpdateInfo/>}/>
                    <Route path={"change-password"} element={<ChangePassword/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default ProfilePage;