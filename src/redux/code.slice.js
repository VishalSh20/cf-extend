import { createSlice } from "@reduxjs/toolkit";
import { BASIC_TEMPLATE } from "../constants";

const initialState = {
    code:{...BASIC_TEMPLATE},
    language:"cpp",
    saving:false,
    running:false,
    runRequestPromise:null,
    runOutputPresent:false,
    runningOutput:{
        overallStatus:null,
        overallMemory:-1,
        overallTime:-1,
        executionResults:null,
        error:null
    },
}

const codeSlice = createSlice({
    name:'code',
    initialState,
    reducers:{
        setCode:(state,action)=>{
            state.code = {...action.payload};
        },
        setLanguage:(state,action)=>{
            state.language = action.payload;
        },
        startSaving:(state)=>{
            state.saving = true;
        },
        stopSaving:(state)=>{
            state.saving = false;
        },
        setRunRequestPromise:(state,action)=>{
            state.runRequestPromise = action.payload;
            console.log(state.runRequestPromise);
        },
        startRunning:(state)=>{
            state.running = true;
            state.runOutputPresent = false;
            state.runningOutput = {...initialState.runningOutput};
        },
        stopRunning:(state,action)=>{
            state.running = false;
            if(action.payload?.results){
                state.runOutputPresent = true;
                state.runningOutput = {...action.payload.results};
            }
            else{
                state.runOutputPresent = false;
                state.runningOutput = {...initialState.runningOutput};
            }
        }
    }
});

export const {setCode,setLanguage,startSaving,stopSaving,setRunRequestPromise,startRunning,stopRunning} = codeSlice.actions;
export default codeSlice.reducer;