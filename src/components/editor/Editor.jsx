import { useState } from "react";
import CodeEditor from "./CodeEditor";

export default function Editor(){
    const allTabs = ["Code","Input","Output","Submissions"];
    const [activeTab, setActiveTab] = useState("Code");
    return (
        <div className="flex flex-col items-center p-2 bg-violet-900">
            {/* tab selection bar */}
            <div className="flex gap-4 w-full items-start px-4 py-2">
            {allTabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeTab === tab
                    ? "bg-blue-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

            {/* tab content */}
            <div className=" p-4 rounded-lg flex w-full">
                {activeTab === "Code" && <CodeEditor/>}
                {activeTab === "Input" && <div>Input Content</div>}
                {activeTab === "Output" && <div>Output Content</div>}
                {activeTab === "Submissions" && <div>Submissions Content</div>}
            </div>
        </div>
    )
}