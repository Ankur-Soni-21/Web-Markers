import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBookmarks as setStoreBookmarks } from "../../features/bookSlice";
import CollectionHeader from "./CollectionHeader";
import BookmarkLink from "../BookmarkLink";
import Container from "../Container";

function Bookmarks() {
  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }
  // 1> Getting User ID
  const userId = useSelector((state) => state.auth.userData.$id);

  // 2> Getting Collection Name
  const params = useParams();
  const dispatch = useDispatch();

  // const { collection_id } = params;
  const collection = "all";

  // * Loading and State Management
  const [loading, setLoading] = useState(true);
  const bookmarksFromStore = useSelector((state) => state.book.bookmarks);
  const [bookmarks, setBookmarks] = useState([]);
  const [viewStyle, setViewStyle] = useState(true);

  // 4> Fetching all the bookmarks
  useEffect(() => {
    appwriteService
      .ListAllBookmarks({
        User_ID: userId,
      })
      .then((response) => {
        const allBookmarks = response.documents
          .filter((bookmark) => bookmark.Is_Collection === false)
          .map((bookmark) => ({
            $id: bookmark.$id,
            userId: bookmark.$id,
            collectionName: bookmark.Collection_Name,
            title: bookmark.Title,
            description: bookmark.Description,
            starred: bookmark.Starred,
            URL: bookmark.URL,
            imageURL: bookmark.Image_URL,
            createdAt: formatDate(bookmark.$createdAt), // Format the date here
          }));

        dispatch(setStoreBookmarks(allBookmarks));
        setLoading(false);
        console.log("All Bookmarks", allBookmarks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setBookmarks(
      collection === "all"
        ? bookmarksFromStore
        : bookmarksFromStore.filter(
            (bookmark) => bookmark.collectionName === collection
          )
    );
  }, [bookmarksFromStore, collection]);

  return !loading ? (
    <>
      {/* * Render the CollectionHeader component */}
      <CollectionHeader
        collection={collection}
        userId={userId}
        setViewStyle={setViewStyle}
        viewStyle={viewStyle}
      />

      {/* * Render the BookmarkLink components */}
      {bookmarks.map((bookmark) => (
        <BookmarkLink
          key={bookmark.$id}
          bookmark={bookmark}
          viewStyle={viewStyle}
        ></BookmarkLink>
      ))}
    </>
  ) : null;
}

export default Bookmarks;
