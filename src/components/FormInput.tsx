import React, {InputHTMLAttributes, ReactNode, useState} from "react";
import "../assets/style/FormInput.css"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    leftIcon?:ReactNode,
    rightIcon?:ReactNode,
    onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

function FormInput({leftIcon, rightIcon, onChange, id, ...rest}:FormInputProps, ref:React.Ref<HTMLInputElement>){

    const [value, setValue]=useState<string>()
    const [labelPosition, setLabelPosition]=useState(
        rest.defaultValue?"top":"middle"
    )

    function handleInputFocus(){
        setLabelPosition("top")
    }

    function handleInputBlur(){
        if(value && value!=rest.defaultValue){
            setLabelPosition("top")
            return
        }
        setLabelPosition("middle")
    }

    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>){
        setValue(event.target.value)
        onChange && onChange(event)
    }

    return (
        <div className={"form-input-wrapper"}>

            <label className={"float "+labelPosition}>{rest.placeholder}</label>
            <input ref={ref} {...rest} id={id} className={"form-input"} placeholder={""}
            onBlur={handleInputBlur} onFocus={handleInputFocus}
                   onChange={handleInputChange}/>

            {rightIcon &&
                <div className={"right-icon"}>{rightIcon}</div>
            }
        </div>
    )
}

export default React.forwardRef(FormInput)