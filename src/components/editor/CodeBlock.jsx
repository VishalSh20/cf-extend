import PropTypes from "prop-types";
import CodeEditor from "./CodeEditor";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Toaster,toast } from "react-hot-toast";
import TestInput from "./TestInput";
import { useSelector , useDispatch} from "react-redux";
import { stopRunning,setRunRequestPromise } from "../../redux/code.slice";
import TestOutput from "./TestOutput";
// import execute from "../../utils/execution/runcode.utils";

CodeBlock.propTypes = {
    problemDetails: PropTypes.object.isRequired,
}

function CodeBlock({problemDetails}){
    const allTabs = ["Code","Input","Output","Submissions"];
    const [showOutputTab,setShowOutputTab] = useState(false);
    const [activeTab,setActiveTab] = useState("Code");
    const [testCases,setTestCases] = useState(problemDetails?.sampleTestCases);

    const code = useSelector((state)=>state.code.code);
    const language = useSelector((state)=>state.code.language);
    const running = useSelector((state) => state.code.running);
    const runOutputPresent = useSelector((state)=>state.code.runOutputPresent);
    const runningOutput = useSelector((state)=>state.code.runningOutput);
    const runRequestPromise = useSelector((state)=>state.code.runRequestPromise);
    const dispatch = useDispatch();

    useEffect(()=>{
      if(running && runRequestPromise){
        const executionToast = toast.loading("Running the code...");
        runRequestPromise.then((response)=>{
          const data = response.data;
          const { overallStatus, overallMemory, overallTime, executionResults } = data;
          let error = null;
          if (overallStatus !== "Accepted") {
            toast.error(overallStatus,{id:"running"});
            for (let i = 0; i < executionResults.length; i++) {
              if (executionResults[i].error) {
                error = (executionResults[i].error);
                break;
              }
            }
          }
          else{
            toast.success("Executed Successfully!",{id:executionToast});
          }

          const results = {overallStatus,overallMemory,overallTime,executionResults,error};
          stopRunning({results});
          setShowOutputTab(true);
          setActiveTab("Output");
        })
        .catch((error)=>{
          const errorResponse = error.response;
          const errorMessage = errorResponse ? errorResponse.data?.error : error.message;
          toast.error(`An error occured- ${errorMessage}`,{id:executionToast});
          stopRunning();
        })
        .finally(()=>{
          dispatch(setRunRequestPromise(null));
        });
      }
    },[running,code,language,testCases,runRequestPromise,problemDetails,dispatch]);

    return (
        <div className="flex flex-col h-full w-[50%] p-2">

         {/* tab selection bar */}
         <div className="flex gap-4 w-full items-start p-2">
         {allTabs.map((tab, index) => (
           <button
             key={index}
             className={`items-center px-4 py-2 rounded-lg ${
               activeTab === tab
                 ? "bg-blue-700 text-white"
                 : "bg-gray-700 hover:bg-gray-600 text-gray-300"
             }
             ${(tab==="Output" && !showOutputTab) ? "hidden" : "flex gap-2"}
             `}
             onClick={() => setActiveTab(tab)}
           >
             <span>
                {tab}
             </span>
             <button 
                className={`text-black hover:text-red-500 rounded-full p-2 ${tab!=="Output" && "hidden"}`}
                onClick={() => {
                    if(tab==="Output"){
                        setShowOutputTab(!showOutputTab);
                    }
                }}
             >
                <X className="w-4 h-4"/>
             </button>
           </button>
         ))}
       </div>

         {/* tab content */}
         <div className="px-2 rounded-lg flex w-full">
             {activeTab === "Code" && <CodeEditor testCases={testCases} setTestCases={setTestCases}/>}
             {activeTab === "Input" && <TestInput testCases={testCases} setTestCases={setTestCases}/>}
             {activeTab === "Output" && <TestOutput runningOutput={runningOutput}/>}
             {activeTab === "Submissions" && <div>Submissions Content</div>}
         </div>
         <Toaster/>
        </div>
    );
}

export default CodeBlock;