import React, {FormEvent, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ChangeProfilePicture from "./ChangeProfilePicture";
import AuthContext from "../../context/AuthContext";
import FormInput from "../../components/FormInput";
import RadioGroup from "../../components/RadioGroup";
import RadioButton from "../../components/RadioButton";
import PrimaryButton from "../../components/PrimaryButton";
import useAxios from "../../hooks/useAxios";
import {User} from "../../models/user";
import {BACK_BASE_URL} from "../../data/data";
import {Console} from "inspector";

function UpdateInfo() {

    const {user, setUser}=useContext(AuthContext)

    const [gender, setGender]=useState(user.gender)

    const [birthdate, setBirthdate]=useState(user.birthdate)

    const api = useAxios()
    async function saveChange(event:FormEvent) {
        event.preventDefault()
        const target= event.target as typeof event.target & {
            last_name :{value:string},
            first_name:{value:string},
            address:{value:string},
            contact:{value:string}
        }

        console.log({
            last_name:target.last_name.value,
            first_name:target.first_name.value,
            address:target.address.value,
            contact:target.contact.value,
            gender:gender,
            birthdate:birthdate
        })

        const response =await api.post<User>(
            BACK_BASE_URL+"/user/update",{
                last_name:target.last_name.value,
                first_name:target.first_name.value,
                address:target.address.value,
                contact:target.contact.value,
                gender:gender,
                birthdate:birthdate
            }
        )

        setUser({...user, ...response.data})

    }

    return (
        <div className={"update-info"}>
            <ChangeProfilePicture/>
            <form className="personal-info" onSubmit={saveChange}>
                <FormInput defaultValue={user.first_name}
                    placeholder={"First name"} name={"first_name"}/>
                <FormInput defaultValue={user.last_name}
                    placeholder={"Last name"} name={"last_name"}/>
                <FormInput defaultValue={user.address}
                    placeholder={"Address"} name={"address"}/>
                <RadioGroup onChange={(value)=>setGender(value)}
                    defaultValue={user.gender}>
                    <RadioButton value={true}>Male</RadioButton>
                    <RadioButton value={false}>Female</RadioButton>
                </RadioGroup>
                <div style={{display:"flex", gap:".5rem", alignItems:"center"}} >
                    <label htmlFor={"birthdate"}>Birthdate</label>
                    <input type="date" className={"date-input"} id={"birthdate"}
                           defaultValue={user.birthdate.toString()}
                           onChange={(event)=>setBirthdate(event.target.value)}/>
                </div>
                <FormInput defaultValue={user.contact}
                        placeholder={"Contact"} name={"contact"}/>

                <PrimaryButton>Save</PrimaryButton>
            </form>
        </div>
    );
}

export default UpdateInfo;