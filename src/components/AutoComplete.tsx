import React, {KeyboardEventHandler, useEffect, useMemo, useRef, useState} from 'react';
import '../assets/style/AutoComplete.css'
import FormInput from "./FormInput";
import {AutoCompleteData} from "../models/AutoCompleteData";
import AutoCompleteItem from "./AutoCompleteItem";

type AutoCompleteProps={
    onChange?:(value:unknown)=>void
    placeholder?:string
    data?:AutoCompleteData[]
    onTextChange?:(text:string)=>void
}

function AutoComplete(props:AutoCompleteProps) {

    // const [data, setData]=useState([])
    const [isVisible, setVisibility]=useState<boolean>(false)
    const [cursor, setCursor]=useState(-1)

    const searchContainer = useRef<HTMLInputElement>(null)

    const [search, setSearch]=useState<string>("")
    const suggestionRef=useRef<HTMLUListElement>(null)

    useEffect(()=>{
        window.addEventListener("mousedown", handleClickOutside)
        return ()=>{
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(()=>{
        if(cursor<0 || cursor >suggestions!.length || !suggestionRef)
            return ()=>{}

        let listItems = Array.from(suggestionRef.current!.children)
        if(listItems[cursor]){
            const element = listItems[cursor] as HTMLElement
            element.scrollIntoView({behavior:"smooth", block:"start"})
        }
    }, [cursor])

    const suggestions=useMemo(()=>{
        // if(!search)return[]
        return props.data
    },[search, props.data])

    function handleClickOutside(event:MouseEvent){
        if(searchContainer.current &&
            !searchContainer.current.contains(event.target as Node) &&
            !suggestionRef.current?.contains(event.target as Node)){
            setVisibility(false)
        }
    }

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value
        if(value){
            setVisibility(true)
            setSearch(value)
        }
        else{
            setVisibility(false)
        }

        props.onTextChange && props.onTextChange(value)
    }

    function selectItem(text:string){
        setSearch(text)
        searchContainer.current!.value=text
        setVisibility(false)
    }

    function handleKeyboardNavigation(event:React.KeyboardEvent<HTMLInputElement>){
        switch (event.key){
            case "ArrowDown":
                isVisible
                ?setCursor(c=>c<suggestions!.length-1?c+1:c):
                    setVisibility(true)
                break;
            case "ArrowUp":
                setCursor(c=>c>0?c-1:0)
                break;
            case "Enter":
                cursor>0 &&
                    setSearch(suggestions![cursor].text)
                    setVisibility(false)
                    searchContainer.current!.value=suggestions![cursor].text

                break;
            case "Escape":
                setCursor(-1)
                setVisibility(false)
                break;
            case "Tab":
                cursor>0 &&
                    setSearch(suggestions![cursor].text)
                    setVisibility(false)
                    searchContainer.current!.value=suggestions![cursor].text
                break;
        }
    }

    return (
        <div className={"autocomplete"}>
            <input placeholder={props.placeholder} className={"input"}
            onChange={(event)=>handleChange(event)}
            ref={searchContainer}
            onKeyDown={handleKeyboardNavigation}/>
            <div className={`suggestion ${isVisible?'visible':'invisible'}`}>
                <ul className={"list-group"} ref={suggestionRef}>
                    {suggestions?.map((suggestion, index)=>{
                        return <AutoCompleteItem value={suggestion.value}
                        text={suggestion.text} onSelect={(value, text)=>{
                            selectItem(text)
                            props.onChange && props.onChange(value)
                        }}
                        key={index}
                        isHighlighted={index===cursor}
                        image={suggestion.image}/>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AutoComplete;