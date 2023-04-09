import {createContext, ReactNode, useState} from "react";
import {College} from "../models/College";
import axios from "axios";
import axiosInstance from "../utils/AxiosInstance";

export type UserCredential={
    email:string,
    password:string,
    confirmPassword:string,
}

export type UserInfo={
    firstName:string,
    lastName:string,
    address:string,
    gender:boolean,
    birthdate:Date|string,
    contact:string
}

export type RoleCompanyInfo={
    admin:boolean
}

export type EnrolledCompanyInfo={
    alumni:boolean
    collegeId:number
}

export type CollegeInfo={
    collegeName:string,
    website:string,
    collegeEmail:string,
    collegeAddress:string,
    collegeContact:string
}

export type RegisterInfo=
    UserCredential &
    UserInfo &
    CollegeInfo &
    RoleCompanyInfo &
    EnrolledCompanyInfo

const defaultData:RegisterInfo={
    address: "",
    admin: false,
    alumni: false,
    birthdate: new Date(),
    collegeAddress: "",
    collegeContact: "",
    collegeEmail: "",
    collegeId: 0,
    collegeName: "",
    confirmPassword: "",
    contact: "",
    email: "",
    firstName: "",
    gender: false,
    lastName: "",
    password: "",
    website: ""


}

const RegisterContext = createContext<any>({})

export default RegisterContext

type RegisterProviderType={
    children:ReactNode
}
export const RegisterProvider = ({children}:RegisterProviderType)=>{

    const [info , setInfo]=useState<RegisterInfo>(defaultData)

    function updateFields(fields:Partial<RegisterInfo>){
        setInfo(prev=>{
            return {...prev, ...fields}
        })
    }

    async function completeRegister(){
        let college:College|{id:number, isAlumni:boolean}|null;
        if(!info.admin){
            college={
                id:info.collegeId,
                isAlumni:info.alumni
            }
        }
        else{
            college={
                name:info.collegeName,
                website:info.website,
                email:info.collegeEmail,
                contact:info.collegeContact,
                address:info.collegeAddress,
            }
        }

        const {collegeName, collegeEmail, collegeContact,
        collegeAddress,collegeId, website, alumni,
            firstName, lastName, confirmPassword,...rest}=info

        const data={...rest, college, first_name:firstName, last_name:lastName}

        const response = await axiosInstance.post(
            "/user/register",
            {...data}
        )

        return {email:data.email, password:data.password}

    }

    const data={
        info,
        updateFields,
        completeRegister
    }

    return (
        <RegisterContext.Provider value={data}>
            {children}
        </RegisterContext.Provider>
    )
}