import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import collSlice from "../features/collSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        coll: collSlice
    }
});

export default store;