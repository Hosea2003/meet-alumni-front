import React, {ReactElement, useState} from 'react';
import {TabItemProps} from "./TabItem";
import '../assets/style/Tab.css'
import {useLocation, useMatch} from "react-router-dom";

interface TabProps{
    children?:ReactElement<TabItemProps>[]
    selectedPath:string
}

function Tab({selectedPath, ...props}:TabProps) {

    // const [selectedPath, setSelectedPath]=useState<string>("")
    // const location = useLocation()

    return (
        <div className={"tab"}>
            {React.Children.map(props.children, (child)=>{
                if(React.isValidElement(child)){
                    const props:TabItemProps={
                        // onTabSelect:()=>setSelectedPath(child.props.to.toString()),
                        to:child.props.to,
                        selectedPath:selectedPath
                    }
                    return React.cloneElement(child!, props)
                }
                return child
            })}
        </div>
    );
}

export default Tab;