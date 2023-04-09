import React, {ReactElement, ReactNode} from 'react';
import {IStep} from "../models/IStep";

export type StepProps={
    children?:ReactElement<IStep>,
    className?:string,
    onNext?:()=>void,
    onPrevious?:()=>void
}

function Step(props:StepProps) {
    return (
        <div className={props.className}>
            {React.cloneElement(props.children!, {onNext:props.onNext, onPrevious:props.onPrevious})}
        </div>
    );
}

export default Step;