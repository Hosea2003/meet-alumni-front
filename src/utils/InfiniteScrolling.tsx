import {MutableRefObject, RefObject} from "react";

export function infiniteScrolling(callback:()=>void){
    const scrollHeight=document.documentElement?.scrollHeight || 0
    const currentHeight=document.documentElement.scrollTop + window.innerHeight
    // console.log(scrollHeight, currentHeight)

    if(currentHeight+1 >= scrollHeight){
        callback()
    }
}

export function infiniteScrollingRef(ref:RefObject<HTMLDivElement>, callback:()=>void){
    const scrollHeight = ref.current?.scrollHeight
    const scrollTop =ref.current?.scrollTop
    const scroll=scrollHeight!-ref.current!.clientHeight

    if(scroll && scrollTop && scrollTop+1>=scroll){
        callback()
    }
}