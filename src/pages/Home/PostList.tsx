import React, {useEffect, useState} from 'react';
import {BACK_BASE_URL} from "../../data/data";
import {PublicUser} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import {Publication} from "../../models/Publication";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import {infiniteScrolling} from "../../utils/InfiniteScrolling";
import PostDetail from "./PostDetail";

function PostList() {

    const initalLink= BACK_BASE_URL+"/publication/posts"

    const [posts, setPosts]=useState<Publication[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        const fetchFriends= async ()=>{
            const response = await api.get<PaginatedResponse<Publication>>(
                nextLink
            )

            setLink(response.data.next)
            setPosts(prev=>[...prev, ...response.data.results])
        }
        fetchFriends()
    }, [nextLink])

    useEffect(()=>{
        const handleScroll=()=>{
            infiniteScrolling(()=>link && setNextLink(link))
        }
        window.addEventListener("scroll", handleScroll)

        return ()=>window.removeEventListener("scroll", handleScroll)
    },[])

    return (
        <div className={"post-list"}>
            {posts.map((post, index)=>(
                <PostDetail
                    key={index}
                    authorId={post.author_id}
                    author={post.author_name}
                    authorProfile={BACK_BASE_URL+ post.author_pdp}
                    commentCount={post.commentsCount}
                    haveLiked ={post.have_liked}
                    likesCount={post.likesCount}
                    image={typeof post.image =="string"?post.image:""}
                    postId={post.id}
                    content={post.content}
                />
            ))}
        </div>
    );
}

export default PostList;