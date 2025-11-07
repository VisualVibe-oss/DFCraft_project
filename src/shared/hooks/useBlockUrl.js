import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI"
import { access } from "fs-extra";

const useBlockUrl = (BlockedItem , isRunning ) => {
    const { urlElements, setUrlElement } = useContext(UrlContext)
    useEffect(() => {
        urlElements.forEach((element, index) => {
            
         if(isRunning)  { 

            if(BlockedItem.sownd){
                blockSownd(element)
            }
    
            if(BlockedItem.acces){
                blockAcces(element);
            }
        }

        
        return ()=>{
            
            
        }

        }
    );

    }, [urlElements , BlockedItem , isRunning]);


    
}


async function dispatcher(isRunning , BlockedItem){
    console.log("Blocker unmounted ⚡")
    if(isRunning){
        try {
            const message = {
                type : "BLOCK" , 
                sownd : BlockedItem.sownd  ,
                access : BlockedItem.acces 

            }
            let response = await browserAPI.runtime.onMessage.sendMessage(message) ;
            console.log("C'est la reponce " ,response)
            
        } catch (error) {
            console.log("Erreur lors de l'envois du  signal au worker")
        }
    }
}






function blockAcces(element) {
    if (element.urlBlocked) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0]
            if (tab.url && tab.url.includes(element.url)) {
                chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("staticPages/blocked.html") });


            }
        })
    }
}

function blockSownd(element) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.url && tab.url.includes(element.url)) {
                chrome.tabs.update(tab.id, { muted: element.sowndBlocked });
            }
        });
    });
}

export default useBlockUrl