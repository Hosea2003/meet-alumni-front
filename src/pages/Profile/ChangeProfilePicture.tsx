import React, {ChangeEvent, EventHandler, useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import {BACK_BASE_URL} from "../../data/data";
import camera from '../../assets/images/camera.png'
import PrimaryButton from "../../components/PrimaryButton";
import useAxios from "../../hooks/useAxios";


function ChangeProfilePicture() {

    const {user, setUser}=useContext(AuthContext)

    const [currentImage, setCurrentImage]=useState<string>(
        BACK_BASE_URL+user.profile_picture
    )

    const [image,setImage]=useState<File|null>()

    const api = useAxios()

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        if(event.target.files){
            const image=event.target.files[0]
            setCurrentImage(URL.createObjectURL(image))
            setImage(image)
        }
    }

    async function changeProfile() {
        if(image){
            const formData=new FormData()
            formData.append("image_url", image)

            const response = await api.post<{
                image_url:string
            }>(
                BACK_BASE_URL+"/user/change-profile-picture",formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            )

            setUser({...user, image_url:response.data.image_url})

        }
    }

    return (
        <div className={"change-picture"}>
            <div className="image-container">
                <div className="image-border">
                    <img src={currentImage} alt=""
                         className={"profile-picture"}/>
                    <label htmlFor="image-file" className={"image-file-label"}>
                        <img src={camera} alt=""/>
                    </label>
                    <input type="file" id={"image-file"}
                        onChange={(handleChange)} accept={"image/*"}/>
                </div>
            </div>
            <PrimaryButton className={"change-picture-btn"}
                onClick={()=>changeProfile()}>Change</PrimaryButton>
        </div>
    );
}

export default ChangeProfilePicture;