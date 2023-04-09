import React, {useContext, useEffect, useState} from 'react';
import CollegeContext from "../../context/CollegeContext";
import collegeLogo from '../../assets/images/college.png'
import {College} from "../../models/College";
import useAxios from "../../hooks/useAxios";
import CollegeMember from "./CollegeMember";

function CollegeDetail() {

    const {searchParams, setSearchParams}= useContext(CollegeContext);
    const [college, setCollege]=useState<College>()

    const collegeId = searchParams.get('id');

    const api = useAxios()

    useEffect(()=>{
        async function fetchCollege(){
            const response = await api.get<College>(
                "/user/college/"+collegeId
            )

            setCollege(response.data)
        }

        if(collegeId)fetchCollege()
    }, [searchParams])

    if(college) return (
        <div className={"college-detail"}>
            <div className="about">
                <img src={collegeLogo} alt=""/>
                <div className="info">
                    <h2>{college.name}</h2>
                    <span>At: {college.address}</span>
                    <span>Visit us {college.website}</span><br/>
                    <div className={"contact-container"}>
                        Contact us:
                        <div className="contact">
                            <span>{college.email}</span>
                            <span>{college.contact}</span>
                        </div>
                    </div>
                </div>
            </div>
            <CollegeMember collegeId={collegeId}/>
        </div>
    )
    else if(collegeId && !college) return(
        <div>Page not found</div>
    )
    else return null
}

export default CollegeDetail;