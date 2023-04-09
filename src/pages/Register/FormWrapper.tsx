import React, {HTMLAttributes, HTMLProps, ReactNode} from 'react';

type FormWrapperType=HTMLProps<HTMLFormElement>

function FormWrapper(props:FormWrapperType) {
    return (
        <form {...props}
            className={"form-wrapper"} style={
            {
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                height:"100%",
            }
        }>
            {props.children}
        </form>
    );
}

export default FormWrapper;