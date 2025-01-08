import axios from "axios";
import { LANGUAGE_ID } from "../../constants.js";
import { JUDGE_URL} from "../../constants.js";

function processResults(testcases,result){
    if(result.executionResults){
        const executionResults = result.executionResults;
        let overallStatus = "Accepted";
        for(let i=0; i<executionResults.length; i++){
            const statusCode = executionResults[i].status.id;
            if(statusCode > 3){
                overallStatus = executionResults[i].status.description;
                break;
            }
            else if(statusCode===3 && (testcases[i].output && executionResults[i].stdout!==testcases[i].output)){
                overallStatus = "Wrong Answer";
                executionResults[i].status.id = 4;
                executionResults[i].status.description = "Wrong Answer";
            }
        }
        
        let time = -1 , memory = -1;
        if(overallStatus==="Accepted" || overallStatus==="Wrong Answer" || overallStatus==="Time Limit Exceeded"){
            executionResults.forEach(element => {
                time = Math.max(element.time,time);
                memory = Math.max(element.memory,memory);
            })
        }
        return {overallStatus,overallMemory:memory,overallTime:time,executionResults};
     }
     else{
        return {error:result.error};
     }
}

export default async function execute(code,language,testcases=[{input:""}],memorylimit=512000,timelimit=2.0){
    try {
        console.log(testcases,code,language);
        
        if(memorylimit>512000 || memorylimit<0)
            return {error:"Invalid memory limit"};
        if(timelimit>100 || timelimit<0)
            return {error:"Invalid time limit"};

        const submissions = testcases.map(testcase => ({
                language_id:`${LANGUAGE_ID[language]}`,
                source_code:code,
                stdin:testcase.input,
                memory_limit:String(memorylimit),
                cpu_time_limit:String(timelimit)
             }));
        
        console.log(submissions);
        const submissionQueuingURL = `${JUDGE_URL}/submissions/batch`;
        const submissionQueuingResponse = await axios.post(
            submissionQueuingURL,
            {submissions:submissions}  
        );
    
        const submissionQueuingResponseData = submissionQueuingResponse.data;
        let tokens = [];
        submissionQueuingResponseData.forEach(element => {
            const elementToken = element.token;
            if(elementToken){
                tokens.push(elementToken);
            }
            else{
                throw new Error(`${Object.keys(element)[0]}- ${Object.values(element)[0]}`);
            }
        });
        
        let results = {};
        const pollStartTime = Date.now();
        const pollDuration = 2*60*1000;
        while(Date.now()-pollStartTime < pollDuration){
            const currTokens = tokens.filter(token => !results[token]);
            if(!currTokens.length){
                break;
            }
    
            const resultCheckURL = `${JUDGE_URL}/submissions/batch/?base64_encoded=true&tokens=${currTokens.join(',')}`;
            const resultCheckResponse = await axios.get(resultCheckURL);
    
            const resultCheckData = resultCheckResponse.data?.submissions;
            console.log(resultCheckData);
            for(let outputData of resultCheckData){
              if(outputData.status.id >= 3){
                    results[outputData.token] = {...outputData,
                        stdout:outputData.stdout ? atob(outputData.stdout) : "",
                        error:(outputData.compile_output || outputData.stderr || outputData.message) ? atob(outputData.compile_output || outputData.stderr || outputData.message) : null};
                }
            }
    
            await new Promise(r => setTimeout(r, 1000));
        }

        if(Object.values(results).some(val=>!val))
            throw new Error("Polling timed out");
    
        let executionResults = [];
        for(let i=0; i<testcases.length; i++){
            executionResults.push(results[tokens[i]]);
        }
      
        return processResults({executionResults});
    
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        return processResults({error:errorMessage});
    }
}