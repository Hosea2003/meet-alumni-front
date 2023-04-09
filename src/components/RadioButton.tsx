import React, {ReactNode} from 'react';

export interface RadioButtonProps{
    icon?:string
    children?:ReactNode,
    onSelect?:(index:number)=>void,
    index?:number,
    selectedIndex?:number
    value:any
    name?:string
}

function RadioButton(props:RadioButtonProps) {

    function handleClick(){
        props.onSelect && props.onSelect(props.index!)
    }

    return (
        <div onClick={()=>handleClick()} className={`option ${props.index==props.selectedIndex && 'selected'}`}>
            <div className={"round"}></div>
            {props.children}
        </div>
    );
}

export default RadioButton;