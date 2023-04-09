import {createContext, ReactNode, useState} from "react";
import {useSearchParams} from "react-router-dom";

const CollegeContext = createContext<any>({})

export default CollegeContext

type CollegeProviderProps={
    children?:ReactNode
}

export function CollegeProvider(props:CollegeProviderProps){
    const [searchParams, setSearchParams] = useSearchParams();

    const [showEnrollment,setShowEnrollment]=useState(false)

    const data={
        searchParams,
        setSearchParams,
        showEnrollment,
        setShowEnrollment
    }

    return <CollegeContext.Provider value={data}>
        {props.children}
    </CollegeContext.Provider>
}