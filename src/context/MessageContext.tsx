import {createContext, ReactNode} from "react";
import {useSearchParams} from "react-router-dom";

const MessageContext = createContext<any>({})

export default MessageContext

type MessageProviderProps = {
    children?:ReactNode
}

export function MessageProvider({children}:MessageProviderProps){

    const [searchParams, setSearchParams]=useSearchParams()

    const data={
        searchParams
    }

    return(
        <MessageContext.Provider value={data}>
            {children}
        </MessageContext.Provider>
    )
}