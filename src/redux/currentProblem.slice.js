import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   problem:null
};

const problemSlice = createSlice({
    name:"currentProblem",
    initialState,
    reducers:{
        setCurrentProblem:(state,action)=>{
            const problem = action.payload;
            if(problem){
                state.problem = problem;
            }
            else{
                state.problem = null;
            }
        }
    }
});

export const {setCurrentProblem} = problemSlice.actions;
export default problemSlice.reducer