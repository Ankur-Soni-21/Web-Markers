import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import collSlice from "../features/collSlice";
import bookSlice from "../features/bookSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        coll: collSlice,
        book: bookSlice,
    }
});

export default store;