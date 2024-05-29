import React, { useRef, useState } from "react";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import { deleteColl } from "../../features/collSlice";
import {
  moveAllBookmarksToTrash,
  moveBookmarksToTrashByCollection,
  removeBookmarksByCollection,
} from "../../features/bookSlice";
import { useDispatch } from "react-redux";

// Now if Collection id === "3" i.e trash we will remove the bookmarks from the collection but not delete the collection
// Now if Collection id === "2" i.e unsorted we will remove the bookmarks from the collection but not delete the collection

function DeleteCollPopup({
  setShowPopup,
  collectionId,
  collectionName,
  userId,
}) {
  const [loader, setLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const moveBookmarksToTrash = () => {
    dispatch(moveBookmarksToTrashByCollection(collectionId));
  };

  const deleteUserCollection = async () => {
    //console.log("Deleting User Collection", collectionId, collectionName);
    appwriteService
      .MoveCollectionToTrash({
        User_ID: userId,
        Collection_ID: collectionId,
      })
      .then((response) => {
        //console.log("Delete Collection Response ", response);
        //console.log("Deleted Collection ID:", collectionId);
        dispatch(
          deleteColl({
            collection_name: collectionName,
            collection_id: collectionId,
          })
        );
        moveBookmarksToTrash();
        navigate("/home/1");
      })
      .catch((error) => {
        console.error("Delete Error", error);
      })
      .finally(() => {
        setShowPopup(false);
        setShowOverlay(false);
      });
  };

  const deleteAllCollection = async () => {
    //console.log("Deleting All Collection", collectionId, collectionName);
    appwriteService
      .MoveAllBookmarksToTrash({
        User_ID: userId,
      })
      .then((response) => {
        //console.log("Delete All Collection Response ", response);
        dispatch(moveAllBookmarksToTrash());
      })
      .catch((error) => {
        console.error("Delete All Error", error);
      })
      .finally(() => {
        setShowPopup(false);
        setShowOverlay(false);
      });
  };

  const deleteUnsortedCollection = async () => {
    //console.log("Deleting Unsorted Collection", collectionId, collectionName);
    appwriteService
      .MoveUnsortedBookmarksToTrash({
        User_ID: userId,
      })
      .then((response) => {
        //console.log("Delete Unsorted Collection Response ", response);
        moveBookmarksToTrash();
      })
      .catch((error) => {
        console.error("Delete Unsorted Error", error);
      })
      .finally(() => {
        setShowPopup(false);
        setShowOverlay(false);
      });
  };

  const deleteBookmarksPermanently = async () => {
    appwriteService
      .RemoveAllBookmarks({
        User_ID: userId,
        Collection_ID: collectionId,
      })
      .then((response) => {
        //console.log("Delete All Bookmarks Response ", response);
        dispatch(removeBookmarksByCollection(collectionId));
      })
      .catch((error) => {
        console.error("Delete All Bookmarks Error", error);
      })
      .finally(() => {
        setShowPopup(false);
        setShowOverlay(false);
      });
  };

  const handleDelete = async () => {
    setLoader(true);
    if (collectionId === "1") {
      deleteAllCollection();
    } else if (collectionId === "2") {
      deleteUnsortedCollection();
    } else if (collectionId === "3") {
      deleteBookmarksPermanently();
    } else {
      deleteUserCollection();
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-black opacity-50 -z-1"></div>
      )}
      <div ref={popupRef}>
        <Container
          className={`transition-all ease-in-out delay-15 absolute top-1/2 left-1/2 transform -translate-x-1/2 rounded-lg -translate-y-1/2 w-2/5 max-w-[480px] bg-slate-200 h-max`}
        >
          <Container
            className={`flex flex-row m-2 px-2 items-center gap-2 font-bold text-lg`}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <h1>Are you sure?</h1>
          </Container>
          <Container className={`flex flex-row m-2 px-2 items-center gap-2`}>
            <p>
              Are you sure you want to delete this collection? All bookmarks
              within the collection will be moved to{" "}
              <span className="font-bold text-red-500">
                {collectionId === "3" ? "PERMANENTLY" : "TRASH"}
              </span>
            </p>
          </Container>
          <Container
            className={`flex flex-col items-center gap-2 w-full px-5 my-3`}
          >
            {loader ? (
              <button className="bg-black rounded-md w-full p-1 disabled text-gray-400 flex flex-row items-center justify-center gap-3 pr-10">
                <img
                  className="w-8 h-8 animate-spin"
                  src={spinner}
                  alt="website logo"
                />
                {`Remove ${collectionName}`}
              </button>
            ) : (
              <button
                className="bg-black rounded-md text-white w-full p-1 h-10"
                onClick={handleDelete}
              >
                {`Remove ${collectionName}`}
              </button>
            )}

            <button
              className="border-2 border-black w-full p-1 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default DeleteCollPopup;
