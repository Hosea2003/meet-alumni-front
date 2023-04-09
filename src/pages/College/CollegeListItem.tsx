import React, {useContext} from 'react';
import college from '../../assets/images/college.png'
import PrimaryButton from "../../components/PrimaryButton";
import CollegeContext from "../../context/CollegeContext";

type CollegeListItemProps={
    name:string,
    email:string,
    collegeId:number,
    address:string
}

function CollegeListItem(props:CollegeListItemProps) {

    const {setSearchParams}=useContext(CollegeContext)

    function viewDetail(){
        setSearchParams(new URLSearchParams({id:props.collegeId.toString()}))
    }

    return (
        <div className={"college-list-item"}>
            <div className="logo">
                <img src={college} alt=""/>
            </div>
            <div className="info">
                <div className="detail">
                    <h3>{props.name}</h3>
                    <span className="text">{props.email}</span>
                    <span className={"text"}>{props.address}</span>
                </div>
                <PrimaryButton onClick={()=>viewDetail()}>View</PrimaryButton>
            </div>
        </div>
    );
}

export default CollegeListItem;