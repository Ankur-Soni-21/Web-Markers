import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    coll: [],
}

const collSlice = createSlice({
    name: "coll",
    initialState,
    reducers: {
        setColl: (state, action) => {
            state.coll = action.payload;
        },
        addColl: (state, action) => {
            state.coll.push(action.payload);
        }
    }
});

export const { setColl, addColl } = collSlice.actions;
export default collSlice.reducer;