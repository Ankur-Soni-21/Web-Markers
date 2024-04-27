import React, { useRef, useEffect, useState } from "react";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import { deleteColl } from "../../features/collSlice";
import { useDispatch, useSelector } from "react-redux";

function DeleteCollPopup({ setShowPopup, collection, userId, showPopup }) {
  const [loader, setLoader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const handleDelete = async () => {
    setLoader(true);

    
    const collectionId = await appwriteService.GetCollectionId({
      User_ID: userId,
      Collection_Name: collection,
    });

    appwriteService
      .MoveCollectionToTrash({
        User_ID: userId,
        Collection_Name: collection,
      })
      .then((response) => {
        console.log("Delete Collection Response ", response);
        console.log("Collection ID:", collectionId);
        dispatch(
          deleteColl({
            collection_name: collection,
            collection_id: collectionId,
          })
        );

        setShowPopup(false);
        setShowOverlay(false);
        navigate("/home/all");
      })
      .catch((error) => {
        console.error("Delete Error", error);
        setShowPopup(false);
        setShowOverlay(false);
      });
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
              <span className="font-bold text-red-500">TRASH</span>
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
                {`Remove ${collection}`}
              </button>
            ) : (
              <button
                className="bg-black rounded-md text-white w-full p-1 h-10"
                onClick={handleDelete}
              >
                {`Remove ${collection}`}
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
