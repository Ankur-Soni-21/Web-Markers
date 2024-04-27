import React, { useEffect, useState } from "react";
import Container from "../Container";
import DeleteCollPopup from "./06_DeleteCollPopup";
import { useSelector } from "react-redux";
function CollectionHeader({ collectionId, userId, setViewStyle, viewStyle }) {
  useEffect(() => {
    console.log("Collection Header", collectionId);
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const collectionName = useSelector((state) => state.coll.coll).find(
    (item) => item.collection_id === collectionId
  ).collection_name;

  const handlePopupToggle = () => {
    setShowPopup((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(collectionId, collectionName);
  }, []);

  return (
    <>
      <Container
        className={`flex flex-row justify-between items-center my-2 border-b-2 border-b-gray-400`}
      >
        <Container className={`m-2 p-2`}>
          <h1 className="text-3xl font-semibold">
            {collectionId === "1" ? "All Bookmarks" : collectionName}
          </h1>
        </Container>
        <Container className={`m-1 p-1 flex flex-row gap-1`}>
          <Container className={`m-1 p-1 `}>
            <button
              title="list view"
              onClick={() => setViewStyle(true)}
              className={`hover:bg-slate-200 rounded-lg py-2 px-3 ${
                viewStyle ? "bg-slate-200" : ""
              }`}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </Container>

          <Container className={`m-1 p-1`}>
            <button
              title="card view"
              onClick={() => setViewStyle(false)}
              className={`hover:bg-slate-200 py-2 px-3 rounded-lg ${
                !viewStyle ? "bg-slate-200" : ""
              }`}
            >
              <i className="fa-solid fa-grip-vertical"></i>
            </button>
          </Container>

          <Container className={`m-1 p-1`}>
            <button
              title="Delete"
              onClick={handlePopupToggle}
              className="hover:bg-slate-200 hover:rounded-lg py-2 px-3"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </Container>
        </Container>
      </Container>
      {showPopup && (
        <DeleteCollPopup
          collectionId={collectionId}
          collectionName={collectionName}
          userId={userId}
          setShowPopup={setShowPopup}
        ></DeleteCollPopup>
      )}
    </>
  );
}

export default CollectionHeader;
