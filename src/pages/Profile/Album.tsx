import React, {useEffect, useState} from 'react';
import {BACK_BASE_URL} from "../../data/data";
import useAxios from "../../hooks/useAxios";
import {PaginatedResponse} from "../../models/PaginatedResponse";
import PrimaryButton from "../../components/PrimaryButton";
import {useParams} from "react-router-dom";

type PictureProps={
    image_url:string
}

function Album() {

    const [pictures, setPictures]=useState<PictureProps[]>([])

    const {id}=useParams()

    const initalLink= BACK_BASE_URL+"/user/album/"+id

    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        async function fetchPictures(){
            const response= await api.get<PaginatedResponse<PictureProps>>(
                nextLink
            )

            setPictures([...pictures, ...response.data.results])
            setLink(response.data.next)
        }
        fetchPictures()
    },[nextLink])

    return (
        <div className={"album"}>
            <div className="pictures">
                {pictures.map((picture, index)=>(
                    <img src={picture.image_url} alt="" className={"picture"}
                    key={index}/>
                ))}
            </div>
            <PrimaryButton className={"show-more"}
                onClick={()=>link && setNextLink(link)}>Show More</PrimaryButton>
        </div>
    );
}

export default Album;