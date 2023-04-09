import React, {useContext, useEffect, useState} from 'react';
import {BACK_BASE_URL} from "../../data/data";
import {PublicUser} from "../../models/user";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import EnrollementItem from "./EnrollementItem";
import {College} from '../../models/College'
import {PaginatedResponse} from "../../models/PaginatedResponse";
import CollegeContext from "../../context/CollegeContext";


type OtherCollege={
    college:College
    requestSent:boolean
}

function Enrollment() {

    const {showEnrollment, setShowEnrollment}=useContext(CollegeContext)

    const {user}=useContext(AuthContext)

    const initalLink= BACK_BASE_URL+"/user/other-colleges"

    const [colleges, setColleges]=useState<OtherCollege[]>([])
    const [nextLink, setNextLink]=useState(initalLink)
    const api = useAxios()
    const [link, setLink]=useState<string|null>()

    useEffect(()=>{
        async function fetchColleges(){
            const response = await api.get<PaginatedResponse<OtherCollege>>(
                nextLink
            )

            setLink(response.data.next)
            setColleges([...colleges, ...response.data.results])
        }
        fetchColleges()
    }, [nextLink])
    
    return showEnrollment? (
        <div className={"enrollment"}>
            {colleges.map(({college, requestSent}, index)=>(
                <EnrollementItem collegeId={college.id!} name={college.name}
                                 requestSent={requestSent}
                key={index}/>
            ))}
        </div>
    ):null;
}

export default Enrollment;