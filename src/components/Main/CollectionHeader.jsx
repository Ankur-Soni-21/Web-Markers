import React, { useEffect, useState } from "react";
import Container from "../Container";
import DeleteCollPopup from "./DeleteCollPopup";
function CollectionHeader({ collection, userId, setViewStyle, viewStyle }) {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  return (
    <>
      <Container
        className={`flex flex-row justify-between items-center my-2 border-b-2 border-b-gray-400`}
      >
        <Container className={`m-2 p-2`}>
          <h1 className="text-3xl font-semibold">
            {collection === "all" ? "All Bookmarks" : collection}
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
          collection={collection}
          userId={userId}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        ></DeleteCollPopup>
      )}
    </>
  );
}

export default CollectionHeader;
