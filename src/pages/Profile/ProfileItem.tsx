import React from 'react';

type ProfileItemProps={
    image:string
    text:string
    field:string
}

function ProfileItem(props:ProfileItemProps) {
    return (
        <div className={"profile-item"}>
            <img src={props.image} alt=""/>
            <div className="text">
                <span>{props.text}</span>
                <span className={"field"}>{props.field}</span>
            </div>
        </div>
    );
}

export default ProfileItem;