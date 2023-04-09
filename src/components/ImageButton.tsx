import React, {HTMLAttributes} from 'react';
import '../assets/style/ImageButton.css'

interface ImageButtonProps extends HTMLAttributes<HTMLButtonElement>{
    image:string
}

function ImageButton(props:ImageButtonProps) {
    return (
        <button {...props} className={`image-btn ${props.className}`}>
            <img src={props.image} alt=""/>
        </button>
    );
}

export default ImageButton;