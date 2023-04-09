import React, {isValidElement, useState} from 'react';
import '../assets/style/RadioGroup.css'
import RadioButton, {RadioButtonProps} from "./RadioButton";
import {Control, Controller, useForm, useFormContext} from "react-hook-form";

interface RadioGroupProps{
    children?:React.ReactElement<RadioButtonProps> | React.ReactElement<RadioButtonProps>[]
    onIndexChange?:(selectedIndex:number)=>void
    onChange?:(value:any)=>void
    labelText?:string
    name?:string,
    defaultValue?:any
}

function RadioGroup(props:RadioGroupProps, ref:React.Ref<HTMLDivElement>) {
    let elements:React.ReactElement<RadioButtonProps>[]=[]

    if(isValidElement(props.children)){
        elements.push(props.children)
    }

    if(Array.isArray(props.children)){
        props.children.forEach(child=>{
            elements.push(child)
        })
    }

    const [selectedIndex, setSelectedIndex]=useState<number>(()=>{
        const index =
            elements.filter(child=>child.props.value==props.defaultValue)[0]
        return index?elements.indexOf(index):0
    })
    function handleSelection(index:number, value:any){
        setSelectedIndex(index)
        // props.onIndexChange && props.onIndexChange(index)
        props.onChange && props.onChange(value)
    }

    return (
        <div className={"radio-group"}>
            {props.labelText &&
                <label className={"label-text"}>{props.labelText}</label>}
            <div className={"options"}>
                {elements.map((child, index)=>(
                    <RadioButton
                        index={index}
                        value={child.props.value}
                        onSelect={()=>{
                            handleSelection(index, child.props.value)
                        }}
                        key={index}
                        selectedIndex={selectedIndex}>
                        {child.props.children}
                    </RadioButton>
                ))}
            </div>
        </div>
    );
}

export default React.forwardRef(RadioGroup);