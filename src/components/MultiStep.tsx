import React, {HTMLProps, isValidElement, ReactNode, useReducer, useState} from 'react';
import '../assets/style/MultiStep.css'
import Step, {StepProps} from "./Step";
import PrimaryButton from "./PrimaryButton";

interface MultiStepProps extends HTMLProps<HTMLDivElement>{
    children?:React.ReactElement<StepProps>|React.ReactElement<StepProps>[]
}

enum multiStepAction{
    next=1,
    previous=0
}

type stepState={
    steps:React.ReactElement<StepProps>[],
    currentIndex:number
}

const pageReducer = (state:stepState, action:multiStepAction):stepState=>{
    switch (action){
        case multiStepAction.next:
            const nextIndex= state.currentIndex+1
            if(nextIndex >=state.steps.length){
                return state
            }
            return {...state, currentIndex:nextIndex}
        case multiStepAction.previous:
            const previousIndex= state.currentIndex-1
            if(previousIndex <0){
                return state
            }
            return {...state, currentIndex:previousIndex}
        default:
            return state
    }
}

function MultiStep(props:MultiStepProps) {

    let elements:React.ReactElement<StepProps>[] =[]

    if(isValidElement(props.children)){
        elements.push(props.children)
    }

    if(Array.isArray(props.children)){
        props.children.forEach(child=>{
            if(isValidElement(child))
                elements.push(child)
        })
    }

    const [stepState, stepDispatch]=useReducer(pageReducer, {steps:elements, currentIndex:0})
    function showStep(action:multiStepAction){
        stepDispatch(action)
    }

    function next(){
        showStep(multiStepAction.next)
    }

    function previous(){
        showStep(multiStepAction.previous)
    }

    const className =props.className?" "+props.className:""

    return (
        <div className={"multistep-form"+className}>
            <div className="progressbar">
                {stepState.steps.map((step, index)=>{
                    const active:string=index==stepState.currentIndex?" active":""
                    return <div className={"progress-number"} key={index}>
                        <div className={"step"+active}>
                            {index+1}
                        </div>
                    </div>
                })}
            </div>
            <div className="form-container">
                <div className="body">
                    {React.cloneElement(stepState.steps[stepState.currentIndex], {onNext:next, onPrevious:previous})}
                </div>
            </div>
            {/*<div className="footer">*/}
            {/*    <PrimaryButton className={`multistep-btn ${stepState.currentIndex==0?"hide":""}`}*/}
            {/*        onClick={()=>showStep(multiStepAction.previous)}>Previous</PrimaryButton>*/}
            {/*    <PrimaryButton className={"multistep-btn"}*/}
            {/*        onClick={()=>showStep(multiStepAction.next)}>*/}
            {/*        {stepState.currentIndex==stepState.steps.length-1?"Finish":"Next"}*/}
            {/*    </PrimaryButton>*/}
            {/*</div>*/}
        </div>
    );
}

export default MultiStep;