import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   page:{
    theme:"none",
    fontSize:16,
    fontFamily:"Arial",
    fontWeight:"normal"
   },
   editor:{
    window:{
       background:"neon",
       fontColor:"white",
       fontFamily:"Arial",
       fontSize:14
    },
    code:{
        theme:"githubDark",
        fontSize:14
    }
   }
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setPageTheme:(state,action)=>{
            state.page = {...state.page,theme:action.payload};
        },
        setPageFontSize:(state,action)=>{
            state.page = {...state.page,fontSize:action.payload};
        },
        setPageFontFamily:(state,action)=>{
            state.page = {...state.page,fontFamily:action.payload};
        },
        setPageFontWeight:(state,action)=>{
            state.page = {...state.page,fontWeight:action.payload};
        },
        setEditorWindowBackground:(state,action)=>{
            state.editor.window = {...state.editor.window,background:action.payload}
        },
        setEditorWindowFontColor:(state,action)=>{
            state.editor.window = {...state.editor.window,fontColor:action.payload}
        },
        setEditorWindowFontFamily:(state,action)=>{
            state.editor.window = {...state.editor.window,fontFamily:action.payload}
        },
        setEditorWindowFontSize:(state,action)=>{
            state.editor.window = {...state.editor.window,fontSize:action.payload}
        },
        setEditorCodeTheme:(state,action)=>{
            state.editor.code = {...state.editor.code,theme:action.payload}
        },
        setEditorCodeFontSize:(state,action)=>{
            state.editor.code = {...state.editor.code,fontSize:action.payload}
        }
    }
});

export default themeSlice.reducer;
export const {
    setPageTheme,
    setPageFontSize,
    setPageFontFamily,
    setPageFontWeight,
    setEditorWindowBackground,
    setEditorWindowFontColor,
    setEditorWindowFontFamily,
    setEditorWindowFontSize,
    setEditorCodeTheme,
    setEditorCodeFontSize,
} = themeSlice.actions;