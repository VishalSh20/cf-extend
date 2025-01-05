import {langs} from "@uiw/codemirror-extensions-langs";
import {githubDark,githubLight,vscodeDark,vscodeLight,dracula,duotoneDark} from "@uiw/codemirror-themes-all";

export const getLanguageExtension=(langname)=>{
    switch(langname){
        case "c":
            return langs.c();
        case "cpp":
            return langs.cpp();
        case "java":
            return langs.java();
        case "python":
            return langs.python();
        case "javascript":
            return langs.javascript({jsx:true});
        default:
            return langs.javascript({jsx:true});
    }
}

export const getTheme=(theme)=>{
    switch(theme){
        case "githubDark":
            return githubDark;
        case "githubLight":
            return githubLight;
        case "vscodeDark":
            return vscodeDark;
        case "vscodeLight":
            return vscodeLight;
        case "dracula":
            return dracula;
        case "duotoneDark":
            return duotoneDark;
        default:
            return githubDark;
    }
}