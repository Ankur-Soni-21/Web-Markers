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
            console.log("Remove Bookmark", action.payload);
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.$id !== action.payload);
            console.log("Bookmarks", state.bookmarks)
        },
        moveBookmarkToTrash: (state, action) => {
            state.bookmarks = state.bookmarks.map(bookmark => {
                if (bookmark.$id === action.payload) {
                    bookmark.collectionId = "3";
                    bookmark.collectionName = "Trash";
                }
                return bookmark;
            })
        },

        filterBookmarks: (state, action) => {
            console.log("Action", action.payload);
            const query = action.payload?.toLowerCase();
            state.filteredBookmarks = state.bookmarks.filter(bookmark =>
                bookmark.title.toLowerCase().includes(query) ||
                bookmark.description.toLowerCase().includes(query)
            );
            console.log(state.filteredBookmarks);
        },
        moveBookmarksToTrashByCollection: (state, action) => {
            state.bookmarks = state.bookmarks.map(bookmark => {
                if (bookmark.collectionId === action.payload) {
                    bookmark.collectionId = "3";
                    bookmark.collectionName = "Trash";
                }
                return bookmark;
            })
        },
        removeBookmarksByCollection: (state, action) => {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.collectionId !== action.payload);
        },
        moveAllBookmarksToTrash: (state) => {
            state.bookmarks = state.bookmarks.map(bookmark => {
                bookmark.collectionId = "3";
                bookmark.collectionName = "Trash";
                return bookmark;
            })
        }
    }
})

export const { setBookmarks, filterBookmarks, addBookmark, removeBookmark, moveBookmarkToTrash, moveAllBookmarksToTrash, moveBookmarksToTrashByCollection, removeBookmarksByCollection } = bookSlice.actions;
export default bookSlice.reducer;