import React, {FormEvent, useState} from 'react';
import '../../assets/style/PostForm.css'
import fileImage from '../../assets/images/image.png'
import {CreatePublication, Publication} from "../../models/Publication";
import PrimaryButton from "../../components/PrimaryButton";
import useAxios from "../../hooks/useAxios";
import {BACK_BASE_URL} from "../../data/data";

function PostForm() {

    const [inputRows, setInputRows]=useState<number>(1)
    const [post, setPost]=useState<CreatePublication>({
        content:""
    })

    const api = useAxios()

    function handleKeyDown(event:React.KeyboardEvent<HTMLTextAreaElement>) {
        const value = event.currentTarget.value;
        const numNewlines = (value.match(/\n/g) || []).length;

        if(event.key =="Enter"){
            setInputRows(prev=>{
                if(prev+1>=10)return prev
                return prev+1
            })
        }
        else if(event.key=="Backspace"){
            setInputRows(prev=>{
                if(prev>1)return prev-1
                return prev
            })
        }
    }

    function handleFileInput(event:React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        setPost(prev=>{
            return {...prev, image:file}
        })

    }

    async function publish() {
        const response = await api.post<Publication>(
            BACK_BASE_URL+"/publication/create",post,{
                headers:{
                    "Content-type":"multipart/form-data"
                }
            }
        )

        setPost({image:undefined, content:""})
    }

    return (
        <div className={"create-post"}>
            <div className="content-container">
                <textarea className={"content"}
                       placeholder={"What do you want to say"}
                        onKeyDown={handleKeyDown}
                          rows={inputRows}
                        onChange={(event)=>{
                            setPost({...post, content:event.target.value})
                        }}
                />
            </div>
            <div className="file-container">
                <label htmlFor={"post-img"} className={"file-label"}>
                    <img src={fileImage} alt=""/>
                    Add image
                </label>
                <input type="file" id={"post-img"} accept={"image/*"}
                    onChange={handleFileInput}/>
                <img src={post.image &&
                    URL.createObjectURL(
                        post.image instanceof Blob?post.image:new Blob()
                    )} alt=""
                    className={"image-preview"}/>
            </div>
            <PrimaryButton onClick={()=>publish()}>Post</PrimaryButton>
        </div>
    );
}

export default PostForm;