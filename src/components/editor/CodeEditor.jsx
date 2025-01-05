import {useState,useRef} from 'react';
import ReactCodeMirror, { lineNumbers } from '@uiw/react-codemirror';
import { getLanguageExtension, getTheme } from '../../utils/editor.utils';

function CodeEditor() {
    const [code, setCode] = useState({
        'c': '#include<stdio.h>\nint main(){\n\tprintf("Hello World!");\n\treturn 0;\n}',
        'cpp': '#include<iostream>\nint main(){\n\tstd::cout<<"Hello World!";\n\treturn 0;\n}',
        'java': 'public class Main{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World!");\n\t}\n}',
        'python': 'print("Hello World!")',
        'javascript': 'console.log("Hello World!")'
    });
    const [language, setLanguage] = useState('c');
    const [fontSize, setFontSize] = useState(16);
    const [theme, setTheme] = useState('githubDark');
    const editorRef = useRef(null);

    const handleCodeRun = () => {
      console.log("Code running!");
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
                    setLanguage(e.target.value);
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
            onClick={handleCodeRun}
          >
            Run
          </button>
          <button
            className='p-2 rounded-md bg-violet-400 hover:bg-violet-500 hover:scale-105 text-white transform transition-all duration-200'
            onClick={handleCodeSubmit}
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
                    setFontSize(e.target.value);
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
                    setTheme(e.target.value);
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
                  onChange={(editor, data, value) => {
                    setCode({...code,[language]:value});
                  }}
                  ref={editorRef}
                />

    </div>
  )
}

export default CodeEditor