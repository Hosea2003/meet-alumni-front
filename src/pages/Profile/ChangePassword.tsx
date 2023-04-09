import React, {FormEvent, useState} from 'react';
import useAxios from "../../hooks/useAxios";
import PasswordInput from "../../components/PasswordInput";
import PrimaryButton from "../../components/PrimaryButton";
import {BACK_BASE_URL} from "../../data/data";

type FieldsProps={
    oldPassword?:string
    confirmPassword?:string
    newPassword?:string
}

function ChangePassword() {

    const api = useAxios()

    const [error, setError]=useState<FieldsProps>()

    const [fields, setFields]=useState<FieldsProps>()

    async function changePassword(event:FormEvent) {

        event.preventDefault()

        if(fields?.confirmPassword!=fields?.newPassword){
            setError({confirmPassword:"Your new Password didn't match"})
            return
        }

        const response = await api.post<boolean>(
            BACK_BASE_URL+"/user/change-password",{
                old_password:fields?.oldPassword,
                password:fields?.newPassword
            }
        )

        if(!response.data){
            setError({oldPassword:"Old password didn't match"})
            return
        }

        setError({})
    }

    return (
        <form className={"personal-info"} onSubmit={changePassword}>
            <PasswordInput name={"old-password"}
                placeholder={"Old Password"}
                           onChange={(event)=>setFields({...fields, oldPassword:event.target.value})}/>
            {error?.oldPassword && <p style={{color:"red", margin:"-10px 0", fontSize:"13px"}}>{error.oldPassword}</p>}
            <PasswordInput name={"new-password"}
                placeholder={"New Password"}
                           onChange={(event)=>setFields({...fields, newPassword:event.target.value})}/>
            <PasswordInput name={"confirm"}
                placeholder={"Confirm Password"}
                           onChange={(event)=>setFields({...fields, confirmPassword:event.target.value})}/>
            {error?.confirmPassword && <p style={{color:"red", margin:"-10px 0", fontSize:"13px"}}>{error.confirmPassword}</p>}
            <PrimaryButton type={"submit"}>Confirm</PrimaryButton>
        </form>
    );
}

export default ChangePassword;