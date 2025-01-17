import { useEffect, useState } from "react";
import Editor from "./components/editor/Editor";
import Header from "./components/ui/Header"
import { setProblemUpdateListener } from "./utils/hooks/useProblemData";

function App() {
  const allTabs = ["Editor", "Settings"];
  const [activeTab, setActiveTab] = useState("Editor");

  useEffect(()=>{
    const cleanUp = setProblemUpdateListener();
    return () => cleanUp();
  },[])

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-black/20">
      <Header/>
      {/* A selection bar for editor, and settings */}
      <div className="flex w-full px-4 py-2 gap-4">
       { allTabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* the editor component(conditionally) */}
      {activeTab === "Editor" && <Editor/>}

      {/* the settings component(conditionally) */}
      {activeTab === "Settings" && <div>Settings Content</div>}
     </div>
  )
}
export default App