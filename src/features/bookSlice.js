import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    bookmarks: [],
    filteredBookmarks: []
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
        },
        filterBookmarks: (state, action) => {
            const query = action.payload.toLowerCase();
            state.filteredBookmarks = state.bookmarks.filter(bookmark =>
                bookmark.name.toLowerCase().includes(query) ||
                bookmark.description.toLowerCase().includes(query)
            );
        },

    }
})

export const { setBookmarks, filterBookmarks, addBookmark, removeBookmark } = bookSlice.actions;
export default bookSlice.reducer;