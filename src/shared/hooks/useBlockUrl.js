import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";


const useBlockUrl = () => {
    const { urlElements, setUrlElement } = useContext(UrlContext)
    useEffect(() => {
        urlElements.forEach((element, index) => {
            
                chrome.tabs.query({}, (tabs) => {
                    console.log("C est la valeur du sowndBlocker :" , element.sowndBlocked)
                    tabs.forEach((tab) => {
                        if (tab.url && tab.url.includes(element.url)) {
                            chrome.tabs.update(tab.id, { muted:element.sowndBlocked });
                            console.log("Cest la valeur du tabs " , tab)
                        }
                    });
                });
            
                
           
            if (element.blockUrl) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [{
                        id: index + 1,
                        priority: 1,
                        action: { type: 'block' },
                        condition: { urlFilter: `*${element.url}*`, resourceTypes: ['main_frame'] }
                    }],
                    removeRuleIds: [index + 1]
                });
            }
        });

    }, [urlElements]);


    return { urlElements, setUrlElement }
}


export default useBlockUrl