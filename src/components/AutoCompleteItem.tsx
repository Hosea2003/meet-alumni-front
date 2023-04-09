import React, {MouseEventHandler} from 'react';

type AutoCompleteItemProps={
    value:any,
    onSelect:(value:any, text:string)=>void
    text:string,
    isHighlighted:boolean
    image?:string
}

function AutoCompleteItem({value, onSelect, text, isHighlighted, image}:AutoCompleteItemProps) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>){
        event.stopPropagation()
        onSelect(value, text)
    }
    return (
        <div onClick={handleClick}
            className={`autocomplete-item ${isHighlighted && 'highlighted'}`}>
            {image &&
                <img src={image} alt=""/>
            }
            {text}
        </div>
    );
}

export default AutoCompleteItem;