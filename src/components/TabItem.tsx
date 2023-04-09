import React from 'react';
import {Link, LinkProps, useLocation, useMatch} from "react-router-dom";

export interface TabItemProps extends LinkProps{
    text?:string
    selectedPath?:string
    onTabSelect?:()=>void
}

function TabItem({selectedPath, onTabSelect, text, ...props}:TabItemProps) {
    return (
        <Link {...props} className={`tab-item ${selectedPath==props.to?'active':''}`}
              onClick={()=>{
                  onTabSelect && onTabSelect()
                }
              }>
            {text}
        </Link>
    );
}

export default TabItem;