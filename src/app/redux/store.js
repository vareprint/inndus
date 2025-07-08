import { configureStore } from "@reduxjs/toolkit";
import productRedcer from "./productSlice";
import subproductReducer from "./subProductSlice";


const store = configureStore({
    reducer:{
        product:productRedcer,
        subproduct: subproductReducer,
    }
})

export default store;