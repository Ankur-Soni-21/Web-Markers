import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    bookmarks: [],
}

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        },
        addBookmark: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        removeBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload);
        }
    }
})

export const { setBookmarks, addBookmark, removeBookmark } = bookSlice.actions;
export default bookSlice.reducer;