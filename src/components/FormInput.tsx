import React from "react";
import "../assets/style/FormInput.css"

function FormInput({rightIcon, leftIcon, onChange ,...rest}:any){
    return <div className={"formInput"}>
        <input {...rest} onChange={onChange}/>
    </div>
}

export default FormInput