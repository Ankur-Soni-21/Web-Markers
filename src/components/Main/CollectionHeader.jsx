import React, { useState } from "react";
import Container from "../Container";
import DeleteCollPopup from "./DeleteCollPopup";
function CollectionHeader({ collection, userId }) {
  const [showPopup, setShowPopup] = useState(false);
  // true === list view
  // false === card view
  const [typeOfView, setTypeOfView] = useState(true);

  const handlePopupToggle = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <Container
        className={`flex flex-row justify-between items-center my-2 border-b-2 border-b-gray-400`}
      >
        <Container className={`m-2 p-2`}>
          <h1 className="text-3xl font-semibold">{collection}</h1>
        </Container>
        <Container className={`m-1 p-1 flex flex-row gap-1`}>
          <Container className={`m-1 p-1`}>
            <button className={`hover:bg-slate-300 hover:rounded-lg py-2 px-3`}>
              <i className="fa-solid fa-list"></i>
            </button>
          </Container>
          <Container className={`m-1 p-1`}>
            <button className={`hover:bg-slate-300 hover:rounded-lg py-2 px-3`}>
              <i className="fa-solid fa-grip-vertical"></i>
            </button>
          </Container>

          <Container className={`m-1 p-1`}>
            <button
              onClick={handlePopupToggle}
              className="hover:bg-slate-300 hover:rounded-full py-2 px-3"
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
