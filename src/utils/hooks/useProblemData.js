/* global chrome */

export const setProblemUpdateListener =  ()=>{
    const messageListener = (message) => {
        if (message.problemUpdated) {
            console.log("Problem updated!");
            console.log(message.problemDetails);
        }
    };
    
    chrome.runtime.onMessage.addListener(messageListener);
    
    return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
    };
}