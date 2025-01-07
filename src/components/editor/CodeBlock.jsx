import PropTypes from "prop-types";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import { X } from "lucide-react";
import TestInput from "./TestInput";

CodeBlock.propTypes = {
    problemDetails: PropTypes.object.isRequired,
}

function CodeBlock({problemDetails}){
    const allTabs = ["Code","Input","Output","Submissions"];
    const [showOutputTab,setShowOutputTab] = useState(false);
    const [activeTab,setActiveTab] = useState("Code");
    const [testCases,setTestCases] = useState(problemDetails?.sampleTestCases);


    console.log(problemDetails);

    return (
        <div className="flex flex-col h-full w-[50%] p-2">

         {/* tab selection bar */}
         <div className="flex gap-4 w-full items-start p-2">
         {allTabs.map((tab, index) => (
           <button
             key={index}
             hidden={tab==="Output" && showOutputTab===false}
             className={`flex gap-2 items-center px-4 py-2 rounded-lg ${
               activeTab === tab
                 ? "bg-blue-700 text-white"
                 : "bg-gray-700 hover:bg-gray-600 text-gray-300"
             }`}
             onClick={() => setActiveTab(tab)}
           >
             <span>
                {tab}
             </span>
             <button 
                hidden={tab!=="Output"}
                className={`text-black hover:text-red-500 rounded-full p-2 `}
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
             {activeTab === "Output" && <div>Output Content</div>}
             {activeTab === "Submissions" && <div>Submissions Content</div>}
         </div>
        </div>
    );
}

export default CodeBlock;