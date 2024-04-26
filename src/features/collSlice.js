import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    coll: [{
        collection_name: "",
        collection_id: "",
    }],
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
        },
        deleteColl: (state, action) => {
            console.log("Delete Collection ", action.payload);
            state.coll = state.coll.filter(item => item !== action.payload);
        }
    }
});

export const { setColl, addColl, deleteColl } = collSlice.actions;
export default collSlice.reducer;