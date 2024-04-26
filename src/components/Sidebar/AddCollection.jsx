import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Container from "../Container";
import { useDispatch, useSelector } from "react-redux";
import { addColl, setColl } from "../../features/collSlice";
import { ID } from "appwrite";
import appwriteService from "../../appwrite/config";

function AddCollection() {
  const [showInput, setShowInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const userId = useSelector((state) => state.auth.userData.$id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      showInput &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
      //* ( if input is being displayed + inputref exists + the target when we clicked is outside the input) => then we close the input
    ) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    // Add event listener for outside clicks when the input field is open
    document.addEventListener("click", handleClickOutside, true);

    // Cleanup function to remove the event listener when the component unmounts
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showInput]);

  const addCollection = () => {
    setShowInput(!showInput);
  };

  const submitCollectionName = (e) => {
    if (collectionName === "") {
      console.log("Collection name cannot be empty");
      return;
    }
    if (e.key !== "Enter") return;

    setCollectionId((c) => ID.unique());
    console.log("collectionid : ", collectionId);
    appwriteService
      .AddCollection({
        User_ID: userId,
        Collection_Name: collectionName,
        Collection_ID: collectionId,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          dispatch(
            addColl({
              collection_name: collectionName,
              collection_id: collectionId,
            })
          );
          setShowInput(false);
          navigate(`/home/${collectionName}`);
          console.log("Collection Added");
          setCollectionName((s) => "");
          setCollectionId((s) => "");
        }
      });
  };
  return (
    <>
      <Button onClick={addCollection}>
        <i className="fa-solid fa-plus"></i>
        <span> Add New Collection</span>
      </Button>

      {showInput && (
        <Container className=" w-full flex flex-row justify-between items-center box-border p-1 px-2 m-1 border-b-2 border-b-gray-400">
          <input
            ref={inputRef}
            type="text"
            placeholder="Collection Name"
            className="p-1 text-gray-400 bg-black border-none outline-none "
            onChange={(e) => setCollectionName(e.target.value)}
            onKeyDown={(e) => submitCollectionName(e)}
          ></input>

          {/* <Button className="invi" onClick={submitCollectionName}>Submit</Button> */}
        </Container>
      )}
    </>
  );
}

export default AddCollection;
