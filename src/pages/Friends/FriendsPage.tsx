import React, {useState} from 'react';
import Container from "../../components/Container";
import FriendLink from "./FriendLink";
import friends from '../../assets/images/two persons.png'
import requests  from '../../assets/images/user_request.png'
import {Route, Routes} from "react-router-dom";
import FriendRequest from "./FriendRequest";
import FriendsList from "./FriendsList";
import '../../assets/style/FriendsPage.css'

function FriendsPage() {

    const [selected, setSelected]=useState<number>(1)
    return (
        <Container>
            <div>
                <FriendLink to={""} image={friends}
                    index={1} selected={selected}
                onSelect={()=>setSelected(1)}>
                    Friends</FriendLink>
                <FriendLink to={"request"} image={requests}
                index={2} selected={selected}
                    onSelect={()=>setSelected(2)}>
                    Request</FriendLink>
            </div>
            <div>
                <Routes>
                    <Route element={<FriendsList/>} path={""}/>
                    <Route element={<FriendRequest/>} path={"request"}/>
                </Routes>
            </div>
        </Container>
    );
}

export default FriendsPage;