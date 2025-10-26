import { useEffect } from "react"


const useSaveUrl =(urlElements)=>{
      useEffect(()=>{
           
            function saveUrl(){
                localStorage.setItem('urls' , JSON.stringify(urlElements))  
            }
    
            saveUrl()
    
        },[urlElements])
}


export default  useSaveUrl