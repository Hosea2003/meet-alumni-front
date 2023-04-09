import {createContext, Dispatch, ReactNode, useState} from "react";
import {Comment} from "../models/Publication";

const PostContext=createContext<{
    comments:Comment[]
    setComments:Dispatch<Comment[]>
}>({comments:[], setComments:()=>{}})

export default PostContext

export function PostProvider(props:{children:ReactNode}){

    const [comments, setComments]=useState<Comment[]>([])

    const data={
        comments,
        setComments
    }
    return(
        <PostContext.Provider value={data}>
            {props.children}
        </PostContext.Provider>
    )
}