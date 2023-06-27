// In the rootReducer you would import all your slices and combine them with combineReducers, and in index.js you would configure the store.

import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "components/Counter/Counter.slice";


const store = configureStore({
    reducer: {
        // Add reducers here as needed
        counter: counterReducer,
    },
});
export default store;
