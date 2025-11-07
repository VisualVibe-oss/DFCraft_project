import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";


const useSaveUrl =()=>{

      const { urlElements, setUrlElement } = useContext(UrlContext)
      useEffect(()=>{
           
            function saveUrl(){
                localStorage.setItem('urls' , JSON.stringify(urlElements))  
            }
    
            saveUrl()
    
        },[urlElements])
      
    return { urlElements, setUrlElement }
}


export default  useSaveUrl