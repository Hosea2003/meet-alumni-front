import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import Register from "./pages/Register/Register";
import ErrorBoundaries from "./utils/ErrorBoundaries";
import UserRequest from "./pages/UserRequest/UserRequest";
import College from "./pages/College/College";
import FriendsPage from "./pages/Friends/FriendsPage";
import MessagePage from "./pages/Message/MessagePage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {

  return (
    <div className="App">
            <AuthProvider>
                <ErrorBoundaries>
                    <Routes>
                        <Route path={'/'} element={<PrivateRoute/>}>
                            <Route path={''} element={<Home/>}/>
                            <Route path={'request'} element={<UserRequest/>}/>
                            <Route path={'college'} element={<College/>}/>
                            <Route path={"friends/*"} element={<FriendsPage/>}/>
                            <Route path={"message/*"} element={<MessagePage/>}/>
                            <Route path={"profile/:id/*"} element={<ProfilePage/>}/>
                        </Route>
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<Register/>} path={"/register"}/>
                    </Routes>
                </ErrorBoundaries>
            </AuthProvider>
    </div>
  );
}

export default App;
