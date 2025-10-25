import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";


const useBlockUrl = () => {
    const { urlElements, setUrlElement } = useContext(UrlContext)
    useEffect(() => {
        urlElements.forEach((element, index) => {
            
                chrome.tabs.query({}, (tabs) => {
                    tabs.forEach((tab) => {
                        if (tab.url && tab.url.includes(element.url)) {
                            chrome.tabs.update(tab.id, { muted:element.sowndBlocked });
                        }
                    });
                });
            
                
            if (element.urlBlocked) {
                console.log("C est element doit etre blocker" , element)
               block(element) ;
            }
        });

    }, [urlElements]);


    return { urlElements, setUrlElement }
}



function block(element) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0]
        if (tab.url && tab.url.includes(element.url)) {
            chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("staticPages/blocked.html") });
            

        }
    })
}

export default useBlockUrl