import { Code2Icon, SettingsIcon, SparklesIcon } from "lucide-react"
import { extractProblemDetails } from "../utils/extractProblemDetails.utils.js"
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux";
import { setCurrentProblem } from "../redux/currentProblem.slice.js";
import Editor from "../components/editor/Editor.jsx";

function Content() {
  const [showOptionToggle, setShowOptionToggle] = useState(false);
  const [showEditor,setShowEditor] = useState(false);
  const dispatch = useDispatch();
  const currentProblem = useSelector((state) => state.currentProblem.problem);
  const problemAvailable = useSelector((state) => state.currentProblem.isAvailable);

  useEffect(() => {
    try {
      const url = window.location.href;
      const regex1 = /^https:\/\/codeforces\.com\/contest\/(\d+)\/problem\/([A-Z][0-9]*)$/
      const regex2 = /^https:\/\/codeforces\.com\/problemset\/problem\/(\d+)\/([A-Z][0-9]*)$/
      const match = url.match(regex1) || url.match(regex2);

      if (!match) {
        throw new Error("URL does not belong to a problems page");
      }

      const data = extractProblemDetails(match[1], match[2]);
      const problemDetails = data.problem;
      
      if(problemDetails) {
        dispatch(setCurrentProblem(problemDetails));
        console.log("Problem Details:", problemDetails);
      } else {
        throw new Error("Could not get problem details: "+data.error.message);
      }
    } catch (error) {
      console.error("error: ", error.message);
      dispatch(setCurrentProblem(null));
    }
  }, [dispatch]);

  useEffect(()=>{
    console.log(currentProblem);
    console.log(problemAvailable);
  },[currentProblem,problemAvailable]);

  return (
    <div className="fixed top-4 right-4 w-full max-h-svh flex flex-col items-end justify-between">

      {/* option toggle */}
      <div className="flex row-reverse gap-4 p-2">
        <button 
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 transform hover:scale-110 transition-all duration-200 shadow-lg text-white"
          onClick={() => setShowOptionToggle(!showOptionToggle)}
        >
          <SparklesIcon className="w-6 h-6" />
        </button>

        <div 
          className={`options_toggle p-6 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl 
          ${showOptionToggle ? "flex gap-4": "hidden"}`}
        >
          {problemAvailable && (
            <div className="flex flex-col gap-3 items-center text-gray-800">
              <span className="text-sm font-medium text-purple-800">
                {currentProblem.title}
              </span>
              <button className="flex gap-2 items-center bg-indigo-600 text-white px-4 py-2 rounded-lg
                hover:bg-indigo-500 transform hover:scale-105 transition-all duration-200"
                  onClick={
                    ()=>{
                      setShowEditor(!showEditor);
                      setShowOptionToggle(false);
                    }
                  } 
                >
                <Code2Icon className="w-6 h-6" />
                <span className="font-bold text-lg">
                  {showEditor ? "Close Editor" : "Open in Editor"}
                </span>
              </button>
            </div>
          )}

          <button className="flex gap-2 items-center bg-pink-600 text-white px-4 py-2 rounded-lg
            hover:bg-pink-500 transform hover:scale-105 transition-all duration-200">
            <SettingsIcon className="w-6 h-6" />
            <span className="font-bold text-lg">
              Settings
            </span>
          </button>
        </div>
      </div>

      {/* editor or ui settings */}
      {showEditor && currentProblem && <Editor problemDetails={currentProblem} showEditor={showEditor} setShowEditor={setShowEditor} />}
    </div>
  )
}

export default Content
