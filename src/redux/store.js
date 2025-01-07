import { configureStore } from "@reduxjs/toolkit";
import currentProblemSlice from "./currentProblem.slice.js"

const store = configureStore({
    reducer:{
        currentProblem:currentProblemSlice
    }
});

export {store};