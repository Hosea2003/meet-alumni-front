import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "../../assets/style/login.css"
import AuthContext from "../../context/AuthContext";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import PasswordInput from "../../components/PasswordInput";

function Login(){

    const {loginUser}=useContext(AuthContext)

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const target= e.target as typeof e.target & {
            email :{value:string},
            password:{value:string}
        }

        loginUser({email:target.email.value, password:target.password.value})
    }

    return (
        <div className={"login-page"}>
            <div className="wrapper">
                <div className="little-message">
                    <h1 className="title">
                        MeetAlumni
                    </h1>
                    <span>Meet your senior and connect with them</span>
                </div>
                <form action="" className="login-form" onSubmit={handleSubmit}>
                    <h3 className="welcome">Welcome back</h3>
                    <FormInput placeholder={"Email"} name={"email"}/>
                    <PasswordInput placeholder={"Password"} name={"password"}/>
                    <PrimaryButton>Log in</PrimaryButton>
                    <div className="footer">
                        <span>Don't have account? <Link to={'/register'} className={"create-account"}>Create one</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login