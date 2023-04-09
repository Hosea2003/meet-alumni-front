import React, {ButtonHTMLAttributes} from 'react';

import '../assets/style/PrimaryButton.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

function PrimaryButton(props:PrimaryButtonProps) {
    return (
        <button {...props} className={`primaryBtn ${props.className}`}>
            {props.children}
        </button>
    );
}

export default PrimaryButton;