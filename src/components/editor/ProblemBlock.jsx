import { useState } from "react";
import PropTypes from "prop-types";

ProblemBlock.propTypes = {
    problemDetails: PropTypes.object.isRequired,
}

function ProblemBlock({problemDetails}){
    const allTabs = ["Statement","Input Description","Output Description","Note"];
    const [activeTab,setActiveTab] = useState("Statement");
    return(
        <div className="w-[50%] h-full bg-inherit border-1 border-violet-700 rounded-lg flex flex-col gap-4 p-4 overflow-y-auto">

            {/* select tab */}
            <div className="flex gap-4 p-2">
                {
                    allTabs.map((tab,index)=>(
                        <button
                            key={index}
                            className={`flex gap-2 items-center px-4 py-2 rounded-lg ${
                                activeTab === tab
                                ? "bg-blue-700 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
                            onClick={()=>setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>

            {/* tab content */}
            {activeTab==="Statement" && 
                <pre className="text-white text-wrap">
                    {problemDetails.statement}
                </pre>
            }
            {
                activeTab==="Input Description" &&
                <pre  className="text-white text-wrap">
                    {problemDetails.inputDescription}
                </pre>
            }
            {
                activeTab==="Output Description" &&
                <pre className="text-white text-wrap">
                {problemDetails.outputDescription}
                </pre>
            }
            {
                activeTab==="Note" &&
                <pre className="text-white text-wrap">
                {problemDetails.note || "note will be here"}
                </pre>
            }

        </div>
    );
}

export default ProblemBlock