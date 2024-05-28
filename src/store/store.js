import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice/authSlice"
// import bookReducer from "../components/Books/BookSlice/BookSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        // books: bookReducer,
    }
})

