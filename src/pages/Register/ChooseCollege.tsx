import React, {FormEvent, useContext, useEffect, useState} from 'react';
import RadioGroup from "../../components/RadioGroup";
import RadioButton from "../../components/RadioButton";
import FormInput from "../../components/FormInput";
import AutoComplete from "../../components/AutoComplete";
import collegeImage from '../../assets/images/college.png'
import FormWrapper from "./FormWrapper";
import PrimaryButton from "../../components/PrimaryButton";
import {IStep} from "../../models/IStep";
import {College} from "../../models/College";
import axios from "axios";
import AutoCompleteItem from "../../components/AutoCompleteItem";
import {AutoCompleteData} from "../../models/AutoCompleteData";
import axiosInstance from "../../utils/AxiosInstance";
import RegisterContext, {CollegeInfo, EnrolledCompanyInfo} from "../../context/RegisterContext";
import {useForm} from "react-hook-form";

function ChooseCollege(props:IStep) {

    const [admin, setAdmin]=useState(false)

    const [colleges, setColleges]=useState<College[]>()
    const [search, setSearch]=useState("")
    const [college, setCollege]=useState<CollegeInfo>({
        collegeAddress: "", collegeContact: "", collegeEmail: "", collegeName: "", website: ""

    })

    const {info, updateFields, completeRegister}=useContext(RegisterContext)

    const [enrolled, setEnrolled]=useState<EnrolledCompanyInfo>({
        alumni:false, collegeId:0
    })

    useEffect(()=>{
        loadColleges()
    }, [search])

    async function loadColleges(){
        const response = await axiosInstance.get<College[]>(
            "/user/colleges",
            {
                params:{
                    name:search
                }
            }
        )
        setColleges(response.data)
    }

    function handleSubmit(event:FormEvent){
        event.preventDefault()
        if(!info.admin){
            updateFields(enrolled)
        }
        else{
            updateFields(college)
        }
        props.onNext!()
    }

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <div className={"choose-college"}>
                <RadioGroup labelText={"Your role"} onChange={(value)=>updateFields({admin:value})}>
                    <RadioButton value={false}>Enroll</RadioButton>
                    <RadioButton value={true}>Admin</RadioButton>
                </RadioGroup>

                {!info.admin?
                    <div className={"enroll"}>
                        <AutoComplete placeholder={"Choose your college"}
                                      data={colleges?.map(college=>{
                                          const item:AutoCompleteData={value:college.id, text:college.name,
                                          image:collegeImage}
                                          return item
                                      })}
                        onChange={(value)=>{
                            setEnrolled({...enrolled, collegeId:value as number})
                        }}
                        onTextChange={(text)=>setSearch(text)}/>

                        <RadioGroup labelText={"Role"} defaultValue={info.alumni}
                        onChange={(value)=>setEnrolled({...enrolled, alumni:value})}>
                            <RadioButton value={false}>Student</RadioButton>
                            <RadioButton value={true}>Alumni</RadioButton>
                        </RadioGroup>
                    </div>
                    :
                    <div className={"register-college"}>
                        <FormInput placeholder={"Name"} defaultValue={info.collegeName}
                        onChange={(event)=>setCollege({...college, collegeName:event.target.value})}/>
                        <FormInput placeholder={"website"} defaultValue={info.website}
                                   onChange={(event)=>setCollege({...college, website:event.target.value})}/>
                        <FormInput type={"email"} placeholder={"Email"} defaultValue={info.collegeEmail}
                                   onChange={(event)=>setCollege({...college, collegeEmail:event.target.value})}/>
                        <FormInput placeholder={"Address"} defaultValue={info.collegeAddress}
                                   onChange={(event)=>setCollege({...college, collegeAddress:event.target.value})}/>
                        <FormInput placeholder={"Contact"} defaultValue={info.collegeContact}
                                   onChange={(event)=>setCollege({...college, collegeContact:event.target.value})}/>
                    </div>}

            </div>

            <div className="footer">
                <PrimaryButton onClick={()=>props.onPrevious!()}>Previous</PrimaryButton>
                <PrimaryButton type={"submit"}>Next</PrimaryButton>
            </div>
        </FormWrapper>
    );
}

export default ChooseCollege;