import React, {useEffect, useState} from 'react';
import useAxios from "../../hooks/useAxios";
import {BACK_BASE_URL} from "../../data/data";
import ProfileItem from "./ProfileItem";
import maleImage from '../../assets/images/male.png'
import femaleImage from '../../assets/images/female.png'
import phone from '../../assets/images/phone.png'
import collegeImage from '../../assets/images/college.png'
import {useParams} from "react-router-dom";

interface CollegeUser{
    name:string,
    alumni:string
}

interface AboutUser{
    first_name:string,
    last_name:string
    email:string
    contact:string
    gender:boolean
    colleges:CollegeUser[]
}

function Info() {

    const api = useAxios()

    const {id}=useParams()

    const [information, setInformation]=useState<AboutUser>(
        {
            first_name:"",
            last_name:"",
            email:"",
            contact:"",
            gender:false,
            colleges:[]
        }
    )

    const userImage=information.gender?maleImage:femaleImage

    useEffect(()=>{
        async function fetchInfo(){
            const response = await api.get<AboutUser>(
                BACK_BASE_URL+"/user/about/"+id
            )

            setInformation(response.data)

        }
        fetchInfo()
    },[])

    return (
        <div className={"info"}>
            <ProfileItem
                field={"First name"}
                image={userImage}
                text={information.first_name}/>
            <ProfileItem
                field={"Last name"}
                image={userImage}
                text={information.last_name}/>
            <ProfileItem
                field={"Email"}
                image={userImage}
                text={information.first_name}/>
            <ProfileItem
                field={"Contact"}
                image={phone}
                text={information.contact}/>
            {information.colleges.map((college,index)=>(
                <ProfileItem
                    field={college.alumni}
                    image={collegeImage}
                    text={college.name}
                    key={index}/>
            ))}
        </div>
    );
}

export default Info;