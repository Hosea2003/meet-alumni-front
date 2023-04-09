import React, {useContext} from 'react';
import {IStep} from "../../models/IStep";
import PrimaryButton from "../../components/PrimaryButton";
import RegisterContext from "../../context/RegisterContext";
import AuthContext from "../../context/AuthContext";

type credential={
    email:string,
    password:string
}
function Finish(props:IStep) {

    const {completeRegister}=useContext(RegisterContext)
    const {loginUser}=useContext(AuthContext)

    function submitRequest(){
        completeRegister().then((data:credential)=>{
            loginUser(data)
        })
    }

    return (
        <div className={"final"} style={{
            height:"100%",
            alignItems:"center",
            display:"flex",
            justifyContent:"center",
            gap:"2rem"
        }}>
            <PrimaryButton onClick={()=>props.onPrevious!()}>Previous</PrimaryButton>
            <PrimaryButton onClick={()=>submitRequest()}>Finish</PrimaryButton>
        </div>
    );
}

export default Finish;