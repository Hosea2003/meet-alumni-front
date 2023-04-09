import React, {useState} from 'react';
import PrimaryButton from "../../components/PrimaryButton";
import useAxios from "../../hooks/useAxios";
import {College} from "../../models/College";
import {BACK_BASE_URL} from "../../data/data";

type EnrollementItemProps={
    name:string
    collegeId:number
    requestSent:boolean
}

function EnrollementItem(props:EnrollementItemProps) {

    const api = useAxios()

    const [requestSent, setRequestSent]=useState(props.requestSent)
    async function enroll(isAlumni:boolean) {
        const response = await api.post<College>(
            BACK_BASE_URL+"/user/send-request/"+props.collegeId,{
                isAlumni:isAlumni
            }
        )

        console.log(response)

        setRequestSent(true)
    }

    return (
        <div className={"enrollment-item"}>
            <h3>{props.name}</h3>
            {!requestSent?(
                <div className="buttons">
                    <PrimaryButton onClick={()=>enroll(true)}>Enroll as Alumni</PrimaryButton>
                    <PrimaryButton onClick={()=>enroll(false)}>Enroll as Student</PrimaryButton>
                </div>
            ):
            <div className={"buttons"}>
                <PrimaryButton disabled={true} style={{background:"#404040"}}>Request Sent</PrimaryButton>
            </div>}
        </div>
    );
}

export default EnrollementItem;