import React, {useState} from 'react';
import Container from "../../components/Container";
import UserList from "./UserList";
import MessageBody from "./MessageBody";
import {MessageProvider} from "../../context/MessageContext";
import {Route, Routes} from "react-router-dom";
import {BACK_BASE_URL} from "../../data/data";
import useAxios from "../../hooks/useAxios";
import '../../assets/style/Message.css'

function MessagePage() {

    return (
        <MessageProvider>
            <Container>
                <UserList/>
                <div id="main-message">
                    <Routes>
                        <Route path={":id"} element={<MessageBody/>}/>
                    </Routes>
                </div>
            </Container>
        </MessageProvider>
    );
}

export default MessagePage;