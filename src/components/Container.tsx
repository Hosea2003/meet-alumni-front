import React, {ReactNode} from 'react';
import "../assets/style/Container.css"

type ContainerProps={
    children?:React.ReactElement[]
}

function Container(props:ContainerProps) {
    return (
        <div className={"container"}>
            {props.children}
        </div>
    );
}

export default Container;