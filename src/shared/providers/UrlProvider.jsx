
    import UrlContext from "../context/urlContext";
    import { useState } from "react";

    export const UrlProvider = ({children})=>{
        
        const [urlElements, setUrlElement] = useState(()=>{
            const saved = localStorage.getItem('urls') ;
            return saved ? JSON.parse(saved) :[]
        });




        return(
            <>
                <UrlContext.Provider value={{urlElements , setUrlElement}}>
                    {children}
                </UrlContext.Provider>
            </>
        )
    }