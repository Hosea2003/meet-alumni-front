import React, {FormEvent, useContext, useState} from 'react';
import FormInput from "../../components/FormInput";
import RadioGroup from "../../components/RadioGroup";
import RadioButton from "../../components/RadioButton";
import FormWrapper from "./FormWrapper";
import PrimaryButton from "../../components/PrimaryButton";
import {IStep} from "../../models/IStep";
import RegisterContext, {UserInfo} from "../../context/RegisterContext";
import {FieldValues, useForm} from "react-hook-form";

function PersonnalInfo(props:IStep, ref:React.Ref<HTMLFormElement>) {

    const {info, updateFields}=useContext(RegisterContext)

    const [userInfo, setUserInfo]=useState<UserInfo>(info)

    function savePersonnalInfo(event:FormEvent){
        event.preventDefault()
        updateFields(userInfo)
        props.onNext!()
    }

    return (
        <FormWrapper ref={ref} onSubmit={savePersonnalInfo}>
            <div className={"register-info"}>
                <FormInput placeholder={"Firstname"} defaultValue={userInfo.firstName}
                    onChange={(e)=>setUserInfo({...userInfo, firstName:e.target.value})}/>
                <FormInput placeholder={"Name"} defaultValue={userInfo.lastName}
                           onChange={(e)=>setUserInfo({...userInfo, lastName:e.target.value})}/>
                <FormInput placeholder={"Address"} defaultValue={userInfo.address}
                           onChange={(e)=>setUserInfo({...userInfo, address:e.target.value})}/>
                <RadioGroup labelText={"Gender"} name={"gender"} defaultValue={userInfo.gender}
                    onChange={(value)=>setUserInfo({...userInfo, gender:value})}>
                    <RadioButton value={true}>Male</RadioButton>
                    <RadioButton value={false}>Female</RadioButton>
                </RadioGroup>
                {/*<FormInput placeholder={"Birthdate"} type={"date"} value={""}/>*/}
                <div className={"form-control"}>

                    <label htmlFor={"birthdate"}>Birthdate</label>
                    <input type="date" className={"date-input"} id={"birthdate"}
                           defaultValue={userInfo.birthdate.toString()}
                           onChange={(e)=>setUserInfo({...userInfo, birthdate:e.target.value})}/>
                </div>
                <FormInput placeholder={"Contact"} defaultValue={userInfo.contact}
                           onChange={(e)=>setUserInfo({...userInfo, contact:e.target.value})}/>
            </div>

            <div className="footer">
                <PrimaryButton onClick={()=>props.onPrevious!()}>Previous</PrimaryButton>
                <PrimaryButton type={"submit"}>Next</PrimaryButton>
            </div>
        </FormWrapper>
    );
}

export default React.forwardRef(PersonnalInfo);