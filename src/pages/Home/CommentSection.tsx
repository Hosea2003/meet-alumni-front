import React, {useContext, useEffect, useRef, useState} from 'react';
import user from '../../assets/images/user.png'
import {BACK_BASE_URL} from "../../data/data";
import {PublicUser} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import {Comment} from "../../models/Publication";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {infiniteScrollingRef} from "../../utils/InfiniteScrolling";
import PostContext from "../../context/PostContext";

type CommentSectionProps = {
    postId:number
}

function CommentSection(props:CommentSectionProps) {

    const initalLink= BACK_BASE_URL+"/publication/comments/"+props.postId

    const [comments, setComments]=useState<Comment[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    const commentRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        async function fetchComments(){
            const response = await api.get<PaginatedResponse<Comment>>(
                nextLink
            )
            setLink(response.data.next)
            setComments([...comments, ...response.data.results])

        }
        fetchComments()
    },[nextLink])

    function handleScroll(){
        infiniteScrollingRef(commentRef, ()=>link && setNextLink(link))
    }

    return (
        <div className={"comments"}>
            {comments.map((comment, index)=>(
                <div className="comment" onScroll={handleScroll}
                    key={index}>
                    <img src={BACK_BASE_URL+ comment.profile_image} alt=""/>
                    <div className="details">
                        <span className={"name"}>{comment.user_name}</span>
                        <span className={"comment-content"}>{comment.comment}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentSection;