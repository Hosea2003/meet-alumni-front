import React, {useContext, useEffect, useRef, useState} from 'react';
import CollegeListItem from "./CollegeListItem";
import {College} from "../../models/College";
import {BACK_BASE_URL} from "../../data/data";
import useAxios from "../../hooks/useAxios";
import PrimaryButton from "../../components/PrimaryButton";
import CollegeContext from "../../context/CollegeContext";

type CollegeRespone={
    next:string|null
    results:College[]
}

function CollegeList() {

    const collegeList=useRef<HTMLDivElement>(null)
    const [colleges, setColleges]=useState<College[]>([])
    const [nextLink, setNextLink]=useState<string>(
        BACK_BASE_URL+"/user/enrolled-colleges"
    )
    const [link, setLink]=useState<string|null>()

    const api = useAxios()

    const {showEnrollment, setShowEnrollment}=useContext(CollegeContext)

    useEffect(()=>{
        async function fetchEnrolled(){
            const response =await api.get<CollegeRespone>(
                nextLink
            )
            setLink(response.data.next)
            setColleges(prevState => [...prevState, ...response.data.results])
        }
        fetchEnrolled()
    }, [nextLink])

    function handleScroll(){
        const scrollHeight = collegeList.current?.scrollHeight
        const scrollTop =collegeList.current?.scrollTop
        const scroll=scrollHeight!-collegeList.current!.clientHeight

        if(scroll && scrollTop && scrollTop+1>=scroll){
            link && setNextLink(link)
        }
    }

    function handleClick() {
        setShowEnrollment((prev:boolean)=>!prev)
    }

    return (
    <div className={"college-list left-bar"} ref={collegeList}
    onScroll={()=>handleScroll()}>
        <PrimaryButton style={{background:"#313131"}}
            onClick={handleClick}>Enroll</PrimaryButton>
        {colleges.map((college, index)=>(
            <CollegeListItem
                key={index}
                 address={college.address}
                collegeId={college.id!} email={college.email}
                name={college.name}/>
        ))}
    </div>
    );
}

export default CollegeList;