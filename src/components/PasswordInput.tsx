import React, {InputHTMLAttributes, useState} from 'react';
import FormInput from "./FormInput";
import eye from '../assets/images/eye.png';
import eyeSlash from '../assets/images/eye_slash.png';
import '../assets/style/PasswordInput.css'

function PasswordInput(props:InputHTMLAttributes<HTMLInputElement>, ref:React.Ref<HTMLInputElement>) {
    const [inputType, setInputType]=useState<string>("password")
    const [image, setImage]=useState<string>(eye)

    function showPassword(){
        if(inputType=="password"){
            setInputType("text")
            setImage(eyeSlash)
        }
        else{
            setInputType("password")
            setImage(eye)
        }
    }

    return (
        <FormInput ref={ref} {...props} type={inputType} rightIcon={
            <button className={"show"} type={"button"} onClick={showPassword}>
                <img src={image} alt=""/>
            </button>
        }/>
    );
}

export default React.forwardRef(PasswordInput);