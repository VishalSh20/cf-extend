import { configureStore,combineReducers } from "@reduxjs/toolkit";
import currentProblemSlice from "./currentProblem.slice.js";
import codeSlice from "./code.slice.js";
import themeSlice from "./theme.slice.js";

const combinedReducer = combineReducers({
    currentProblem:currentProblemSlice,
    code:codeSlice,
    theme:themeSlice
})

const store = configureStore({
    reducer:combinedReducer
});

export {store};