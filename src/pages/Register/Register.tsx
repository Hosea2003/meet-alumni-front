import React, {FormEvent, useState} from 'react';
import "../../assets/style/register.css"
import MultiStep from "../../components/MultiStep";
import Step from "../../components/Step";
import {Link} from "react-router-dom";
import Credential from "./Credential";
import PersonnalInfo from "./PersonnalInfo";
import ChooseCollege from "./ChooseCollege";
import {RegisterProvider} from "../../context/RegisterContext";
import Finish from "./Finish";

function Register():JSX.Element {

    return (
        <div className={"page"}>
            <div className={"register-page"}>
            <h3>Register your account</h3>
            <div className="register">
                <RegisterProvider>
                    <MultiStep className={"multistep"}>
                        <Step className={"step-form"}>
                            <Credential/>
                        </Step>
                        <Step className={"step-form"}>
                            <PersonnalInfo/>
                        </Step>
                        <Step className={"step-form"}>
                            <ChooseCollege/>
                        </Step>
                        <Step className={"step-form"}>
                            <Finish/>
                        </Step>
                    </MultiStep>
                </RegisterProvider>
            </div>
            <div className="footer">
                <span>Already have account? <Link to={'/login'} className={"login"}>Login</Link></span>
            </div>
        </div>
        </div>
    );
}

export default Register;