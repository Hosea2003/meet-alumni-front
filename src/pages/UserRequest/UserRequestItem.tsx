import React, {useState} from 'react';
import PrimaryButton from "../../components/PrimaryButton";
import ImageButton from "../../components/ImageButton";
import bin from '../../assets/images/bin.png'
import '../../assets/style/UserRequestItem.css'
import useAxios from "../../hooks/useAxios";
import {dateDiff} from "../../utils/DateDiff";

type UserRequestItemProps={
    image:string,
    firstName:string,
    lastName:string,
    isAlumni:boolean,
    gender:boolean,
    date:Date,
    requestId:number
}

export interface UserRequestType{
    image:string,
    first_name:string,
    last_name:string,
    id:number,
    user:number,
    isAlumni:boolean,
    dateRequested:Date
    gender:boolean

    isConfirmed:boolean

}

function UserRequestItem(props:UserRequestItemProps) {

    const api = useAxios()

    const [text, setText]=useState<string|undefined>()

    async function takeAction(action:string){
        const response = await api.post<UserRequestType>(
            "/user/action-request/"+props.requestId,{},{
                params:{
                    actin:action
                }
            }
        )

        return response.data
    }

    async function accept(){
        const user = await takeAction("accept")
        setText("Request accepted")
    }

    async function refuse(){
        const user = await takeAction("refuse")
        setText("Request refused")
    }

    return (
        <div className={"user-request-item"}>
            <div className="info">
                <img src={props.image} alt=""/>
                <div className="details">
                    <div className="head">
                        <h3>{props.firstName+" "+props.lastName}</h3>
                        <span className="date-request">{dateDiff(props.date)}</span>
                    </div>
                    <span>{props.gender?"He":"She"} is requesting to
                    be {props.isAlumni?"an alumni":"a student"}</span>
                </div>
            </div>
            {text?
                <div className={"result-text"}>
                    {text}
                </div>:
                <div className="actions">
                    <PrimaryButton className={"accept-btn"}
                        onClick={()=>accept()}>Accept</PrimaryButton>
                    <ImageButton image={bin} className={"request-bin"}
                        onClick={()=>refuse()}/>
                </div>
            }

        </div>
    );
}

export default UserRequestItem;