import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    coll: [{
        collection_name: "All Bookmarks",
        collection_id: "1",
    },
    {
        collection_name: "Trash",
        collection_id: "3",
    },
    {
        collection_name: "Unsorted",
        collection_id: "2",
    }],
}

const collSlice = createSlice({
    name: "coll",
    initialState,
    reducers: {
        setColl: (state, action) => {
            state.coll = [...initialState.coll, ...action.payload]
            // console.log("coll", state.coll);
        },
        addColl: (state, action) => {
            state.coll.push(action.payload);
        },
        deleteColl: (state, action) => {
            // console.log("Delete Collection ", action.payload);
            state.coll = state.coll.filter(item => item.collection_id !== action.payload.collection_id);
        }

    }
});

export const { setColl, addColl, deleteColl } = collSlice.actions;
export default collSlice.reducer;