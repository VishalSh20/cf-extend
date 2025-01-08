import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isAvailable:false,
   problem:{}
};

const problemSlice = createSlice({
    name:"currentProblem",
    initialState,
    reducers:{
        setCurrentProblem:(state,action)=>{
            const problem = action.payload;
            if(problem){
                state.problem = {...problem};
                state.isAvailable = true;
            }
            else{
                state = {...initialState}
            }
        }
    }
});

export const {setCurrentProblem} = problemSlice.actions;
export default problemSlice.reducer