import {useRef} from 'react';
import ReactCodeMirror, { lineNumbers } from '@uiw/react-codemirror';
import { getLanguageExtension, getTheme } from '../../utils/editor.utils';
import { useSelector, useDispatch } from 'react-redux';
import { setCode,setLanguage } from '../../redux/code.slice';
import {setEditorCodeFontSize,setEditorCodeTheme} from '../../redux/theme.slice.js';
import {startRunning,setRunRequestPromise} from "../../redux/code.slice.js";
import execute from '../../utils/execution/runcode.utils.js';

function CodeEditor() {
    const dispatch = useDispatch();

    const problemDetails = useSelector((state)=>state.currentProblem.problem);
    const code = useSelector((state)=>state.code.code);
    const language = useSelector((state)=>state.code.language);
    const fontSize = useSelector((state)=>state.theme.editor.code.fontSize);
    const theme = useSelector((state)=>state.theme.editor.code.theme);
    const editorRef = useRef(null);

    const running = useSelector((state) => state.code.running);

    const handleCodeRun = () => {
          dispatch(startRunning());
          const requestPromise = execute(code[language],language,problemDetails.testCases,problemDetails.memoryLimit,problemDetails.timeLimit);
          dispatch(setRunRequestPromise(requestPromise));
    }

    const handleCodeSubmit = ()=>{
      console.log("Code submitted!");
    }
    
  return (
    <div className='flex flex-col w-full gap-2 bg-inherit'>

        <div className="flex gap-4 items-end justify-between">
            <select 
                id='language'
                value={language}
                className='p-2 bg-violet-600 outline'
                onChange={(e)=>{
                    dispatch(setLanguage(e.target.value));
                }}
            >
                <option value='c'>C</option>
                <option value='cpp'>C++</option>
                <option value='java'>Java</option>
                <option value='python'>Python</option>
                <option value='javascript'>JavaScript</option>
            </select>
            
          <div className="flex gap-4 items-center">
          <button
            className='p-2 rounded-md bg-green-400 hover:bg-emerald-500 hover:scale-105 text-white transform transition-all duration-200'
            onClick={()=>{
              handleCodeRun();
            }}
            disabled={running}
          >
            Run
          </button>
          <button
            className='p-2 rounded-md bg-violet-400 hover:bg-violet-500 hover:scale-105 text-white transform transition-all duration-200'
            onClick={handleCodeSubmit}
            disabled={running}
          >
            Submit
          </button>
          </div>
          
          <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <label htmlFor='fontSize'>Font Size:</label>
            <input 
                id='fontSize'
                type='number'
                value={fontSize}
                step={2}
                min={10}
                max={20}
                className='p-2 bg-violet-600 outline max-w-20'
                onChange={(e)=>{
                    dispatch(setEditorCodeFontSize(e.target.value));
                }}
            />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor='editor-theme'>Editor theme</label>
            <select 
                id='editor-theme'
                value={theme}
                className='p-2 bg-violet-600 outline'
                onChange={(e)=>{
                    dispatch(setEditorCodeTheme(e.target.value));
                }}
            >
                <option value='githubDark'>Github Dark</option>
                <option value='githubLight'>Github Light</option>
                <option value='vscodeDark'>VSCode Dark</option>
                <option value='vscodeLight'>VSCode Light</option>
                <option value='dracula'>Dracula</option>
                <option value='duotoneDark'>Duotone Dark</option>
            </select>
            </div>
          </div>


        </div>

        <ReactCodeMirror
                  height="90vh"
                  width='100%'
                  theme={getTheme(theme)}
                  value={code[language]}
                  extensions={[
                    getLanguageExtension(language),
                    lineNumbers()
                  ]}
                  style={{
                    fontSize: `${fontSize}px`,
                    height: '100%'
                }}
                  onChange={(editorValue) => {
                    dispatch(setCode({...code,[language]:editorValue}));
                  }}
                  ref={editorRef}
                />

    </div>
  )
}

export default CodeEditor