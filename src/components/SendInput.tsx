import React, {InputHTMLAttributes} from 'react';
import '../assets/style/SendInput.css'
import send from '../assets/images/send.png'

interface SendInputProps extends InputHTMLAttributes<HTMLInputElement>{

}

function SendInput(props:SendInputProps) {
    return (
        <div className={"send-input"}>
            <input type="text" {...props}/>
            <button className={"send-button"} type={"submit"}>
                <img src={send} alt=""/>
            </button>
        </div>
    );
}

export default SendInput;