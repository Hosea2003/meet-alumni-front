import React, {FormEvent, useContext, useState} from 'react';
import likeColored from '../../assets/images/like_colored.png'
import likeGrey from '../../assets/images/like_grey.png'
import commentImage from '../../assets/images/comment.png'
import useAxios from "../../hooks/useAxios";
import {Comment, Publication} from "../../models/Publication";
import {BACK_BASE_URL} from "../../data/data";
import CommentSection from "./CommentSection";
import SendInput from "../../components/SendInput";
import PostContext, {PostProvider} from "../../context/PostContext";

type PostDetailProps={
    author:string,
    postId:number,
    authorProfile:string,
    likesCount:number,
    commentCount:number
    image?:string
    haveLiked:boolean
    authorId:number
    content:string
}

function PostDetail(props:PostDetailProps) {


    const [count, setCount]=
        useState<{likesCount:number, commentCount:number}>({
            likesCount:props.likesCount,
            commentCount:props.commentCount
        })

    const [haveLiked, setHaveLiked]=useState(props.haveLiked)

    const api = useAxios()

    async function likePost() {
        const response = await api.patch<Publication>(
            BACK_BASE_URL+"/publication/like/"+props.postId
        )

        setCount({...count, likesCount:response.data.likesCount})
        setHaveLiked(response.data.have_liked)
    }

    async function sendComment(event:FormEvent) {
        event.preventDefault()
        const target= event.target as typeof event.target & {
            comment:{value:string}
        }
        const response = await api.post<Comment>(
            BACK_BASE_URL+"/publication/comment/"+props.postId,{
                comment:target.comment.value
            }
        )
        setCount(prev=>{
            return {...prev, commentCount:prev.commentCount+1}
        })

    }

    return (
        <div className={"post"}>
            <div className="post-head">
                <img src={props.authorProfile} alt=""/>
                <h4 className="name">{props.author}</h4>
            </div>
            <p>{props.content}</p>
            {props.image && (
                <div className="image-container">
                    <img src={props.image} alt=""/>
                </div>
            )}
            <div className="post-footer">
                <button className={"post-action-btn"}
                onClick={()=>likePost()}>
                    <img src={haveLiked?likeColored:likeGrey} alt=""/>
                    {count.likesCount} Like
                </button>
                <button className="post-action-btn">
                    <img src={commentImage} alt=""/>
                    {count.commentCount} Comment
                </button>
            </div>
            <div className="comment-section">
                <CommentSection postId={props.postId}/>
                <form className={"send-comment"} onSubmit={sendComment}>
                    <SendInput placeholder={"Your comment here"} name={"comment"}/>
                </form>
            </div>
        </div>
    );
}

export default PostDetail;