import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBookmarks as setStoreBookmarks } from "../../features/bookSlice";
import CollectionHeader from "./04_CollectionHeader";
import BookmarkLink from "../BookmarkLink";
import Container from "../Container";
import EmptyCollectionImage from "../../assets/EmptyCollection.webp";

function Bookmarks() {
  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }
  // 1> Getting User ID
  const userId = useSelector((state) =>
    state.auth.userData ? state.auth.userData.$id : null
  );
  const filteredBookmarks = useSelector(
    (state) => state.book.filteredBookmarks
  );

  // 2> Getting Collection Name
  const params = useParams();
  const dispatch = useDispatch();

  const { collectionId, query } = params;

  // * Loading and State Management
  const [loading, setLoading] = useState(true);
  const bookmarksFromStore = useSelector((state) => state.book.bookmarks);
  const allBookmarks = bookmarksFromStore.filter(
    (bookmark) => bookmark.collectionName !== "Trash"
  );
  const [bookmarks, setBookmarks] = useState([]);
  const [viewStyle, setViewStyle] = useState(true);

  // 4> Fetching all the bookmarks
  useEffect(() => {
    // //console.log("Params", params);
    // //console.log("Query", query);
    // //console.log("Collection ID", collectionId);
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
            collectionId: bookmark.Collection_ID,
            title: bookmark.Title,
            description: bookmark.Description,
            starred: bookmark.Starred,
            URL: bookmark.URL,
            imageURL: bookmark.Image_URL,
            createdAt: formatDate(bookmark.$createdAt), // Format the date here
          }));

        dispatch(setStoreBookmarks(allBookmarks));
        setLoading(false);
        //console.log("All Bookmarks", allBookmarks);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  useEffect(() => {
    if (collectionId === "1") {
      // //console.log("Filtered Bookmarks", filteredBookmarks);
      if (query) setBookmarks(filteredBookmarks);
      else setBookmarks(allBookmarks);
    } else {
      const filteredBookmarks = bookmarksFromStore.filter(
        (bookmark) => bookmark.collectionId === collectionId
      );
      if (filteredBookmarks.length > 0) {
        setBookmarks(filteredBookmarks);
      } else {
        setBookmarks([]);
        // navigate("/home/1");
      }
    }
  }, [bookmarksFromStore, collectionId, filteredBookmarks, query]);

  return !loading ? (
    <>
      {/* * Render the CollectionHeader component */}
      <CollectionHeader
        collectionId={collectionId}
        userId={userId}
        setViewStyle={setViewStyle}
        viewStyle={viewStyle}
      />

      {/* * Render the BookmarkLink components */}
      {bookmarks.length !== 0 ? (
        <div>
          {bookmarks.map((bookmark) => (
            <BookmarkLink
              key={bookmark.$id}
              bookmark={bookmark}
              viewStyle={viewStyle}
            ></BookmarkLink>
          ))}
        </div>
      ) : (
        <Container
          className={`flex flex-col items-center justify-center mt-10`}
        >
          <img
            src={EmptyCollectionImage}
            alt=""
            className="rounded-full w-1/2 max-w-[360px]"
          />
          <p className="text-2xl font-normal mt-4 text-slate-500">
            This Collection has no Bookmarks
          </p>
        </Container>
      )}
    </>
  ) : null;
}

export default Bookmarks;
