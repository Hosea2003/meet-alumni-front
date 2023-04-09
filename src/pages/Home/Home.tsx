import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import PostForm from "./PostForm";
import '../../assets/style/Home.css'
import PostList from "./PostList";

function Home(){
    let {user} = useContext(AuthContext)

    const axios =useAxios()

    return (
        <div className={"home"}>
            <div className="wrapper">
                <PostForm/>
                <PostList/>
            </div>
        </div>
    )
}

export default Home