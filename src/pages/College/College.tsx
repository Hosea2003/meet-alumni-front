import React, {useContext} from 'react';
import CollegeList from "./CollegeList";
import CollegeDetail from "./CollegeDetail";
import Enrollment from "./Enrollment";
import {CollegeProvider} from "../../context/CollegeContext";
import AuthContext from "../../context/AuthContext";
import '../../assets/style/College.css'
function College() {



    return (
        <div className={"college"}>
            <CollegeProvider>
                <CollegeList/>
                <div className="right">
                    <CollegeDetail/>
                    <Enrollment/>
                </div>
            </CollegeProvider>
        </div>
    );
}

export default College;