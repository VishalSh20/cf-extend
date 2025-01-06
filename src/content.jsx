import './index.css'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ContentPage from '@/content/content'
import {extractProblemDetails} from "./utils/extractProblemDetails.utils.js"
import { addCurrentProblem,clearCurrentProblem } from './db/indexedDB.config.js'

const root = document.createElement('div');
root.id = '__cf_reimagine_content_container'
document.body.append(root);
// Execute immediately since content scripts run after DOM is ready
(async() => {
    const url = window.location.href;
    const regex1 = /^https:\/\/codeforces\.com\/contest\/(\d+)\/problem\/([A-Z][0-9]*)$/
    const regex2 = /^https:\/\/codeforces\.com\/problemset\/problem\/(\d+)\/([A-Z][0-9]*)$/
    const match = url.match(regex1) || url.match(regex2);
    if (!match) {
      console.log("URL does not match the expected pattern.");
      return;
    }
    const problemDetails = extractProblemDetails(match[1], match[2]);
    if(problemDetails){
      await addCurrentProblem(problemDetails);
      console.log("Problem Details:", problemDetails);
    }
    else{
      await clearCurrentProblem();
      console.log("No Problem Details Found");
    }
})();


createRoot(root).render(
  <StrictMode>
    <ContentPage />
  </StrictMode>
);