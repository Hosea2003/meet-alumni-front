import React, {FormEvent, useContext, forwardRef, useRef} from 'react';
import FormInput from "../../components/FormInput";
import PasswordInput from "../../components/PasswordInput";
import {IStep} from "../../models/IStep";
import PrimaryButton from "../../components/PrimaryButton";
import FormWrapper from "./FormWrapper";
import RegisterContext, {UserCredential} from "../../context/RegisterContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";

function Credential(props:IStep, ref: React.Ref<HTMLFormElement>) {

    const {info, updateFields}=useContext(RegisterContext)

    const {
        watch,
        register,
        handleSubmit,
        formState:{errors}}=useForm<UserCredential>({
        defaultValues:{
            email:info.email,
            password:info.password,
            confirmPassword:info.confirmPassword
        }
    })

    const password = useRef({});
    password.current = watch("password", "");

    async function validateEmail(email:string){
        const response = await axiosInstance.get<boolean>(
            "/user/check-email",
            {
                params:{
                    email:email
                }
            }
        )

        const emailExist = response.data
        if(emailExist)
            return "This email is already registered"
    }

    function validatePassword(value:string){
    //     validate password:
    //     should contains 8 char, ...
    }

    function validateConfirmPassword(value:string){
        if(value != password.current)
            return "Password does not match"
    }
    function saveCredential(data:UserCredential){
        //     do some validation
        updateFields(data)
        props.onNext!()
    }

    return (
        <FormWrapper onSubmit={handleSubmit(saveCredential)} ref={ref}>
            <div className={"register-credential"}>
                <FormInput placeholder={"Email"}
                           {...register("email", {
                               required:true,
                               validate:validateEmail
                           })}/>
                {errors.email && <span className={"error-text"}>{errors.email?.message}</span>}
                <PasswordInput placeholder={"Password"}
                               {...register("password",{
                                   required:true
                               })}/>
                {errors.confirmPassword && <span className={"error-text"}>{errors.confirmPassword?.message}</span>}
                <PasswordInput placeholder={"Confirm Password"}
                               {...register("confirmPassword", {
                                   required:true,
                                   validate:validateConfirmPassword
                               })}/>
            </div>
            <div className="footer">
                <PrimaryButton type={"submit"}>Next</PrimaryButton>
            </div>
        </FormWrapper>
    );
}

Credential.displayName = "Credential";

Credential.canNext=()=>{

}

export default forwardRef(Credential);
