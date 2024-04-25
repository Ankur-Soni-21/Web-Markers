import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBookmarks } from "../../features/bookSlice";
import CollectionHeader from "./CollectionHeader";
import BookmarkLink from "../BookmarkLink";

function Bookmarks() {
  // 1> Getting User ID
  const userId = useSelector((state) => state.auth.userData.$id);
  // 2> Getting Collection Name
  const params = useParams();
  const dispatch = useDispatch();

  // const { collection } = params;
  const collection = "Updated Collection";
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  // 4> Fetching all the bookmarks
  useEffect(() => {
    appwriteService
      .ListAllBookmarks({
        User_ID: userId,
      })
      .then((response) => {
        const bookmarks = response.documents
          .filter((bookmark) => bookmark.Is_Collection === false)
          .map((bookmark) => ({
            userId: bookmark.$id,
            collectionName: bookmark.Collection_Name,
            title: bookmark.Title,
            description: bookmark.Description,
            starred: bookmark.Starred,
            URL: bookmark.URL,
            imageURL: bookmark.Image_URL,
          }));

        // We only want the bookmarks from a collection only
        setBooks(
          bookmarks.filter((bookmark) => bookmark.collectionName === collection)
        );

        // NOTE : Not in Use really but still kept just in case
        dispatch(setBookmarks(bookmarks));

        setLoading(false);
        console.log("All Bookmarks", bookmarks);
        console.log("Bookmarks", books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return !loading ? (
    <>
      <CollectionHeader collection={collection} userId={userId} />
      {books.map((bookmark) => (
        <BookmarkLink></BookmarkLink>
      ))}
    </>
  ) : null;
}

export default Bookmarks;
