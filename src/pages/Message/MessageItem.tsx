import React from 'react';

type MessageItemProps={
    direction:string
    content:string
}

function MessageItem(props:MessageItemProps) {
    return (
        <div className={"message-item"}>
            <div className={"item "+ props.direction}>
                {props.content}
            </div>
        </div>
    );
}

export default MessageItem;