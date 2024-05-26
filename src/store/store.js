import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice/authSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})

