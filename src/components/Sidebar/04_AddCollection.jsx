import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Button from "../Button";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { addColl } from "../../features/collSlice";

function AddCollection() {
  // Use State
  const [showInput, setShowInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  // Redux
  const userId = useSelector((state) =>
    state.auth.userData ? state.auth.userData.$id : null
  );

  // Other Functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Use Effect
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showInput]);

  // Handle Click Outside Function
  const handleClickOutside = (event) => {
    if (
      showInput &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowInput(false);
    }
  };

  // Add Collection Function
  const addCollection = () => {
    setShowInput(!showInput);
  };

  // Submit Collection Name
  const submitCollectionName = (e) => {
    if (e.key !== "Enter") return;

    if (collectionName === "") {
      //console.log("Collection name cannot be empty");
      return;
    }

    const newCollectionId = uuidv4();

    appwriteService
      .AddCollection({
        User_ID: userId,
        Collection_Name: collectionName,
        Collection_ID: newCollectionId,
      })
      .then((response) => {
        //console.log(response);
        if (response) {
          dispatch(
            addColl({
              collection_name: collectionName,
              collection_id: newCollectionId,
            })
          );
          setShowInput(false);
          //console.log("collectionid : ", newCollectionId);
          navigate(`/home/${newCollectionId}`);
          //console.log("Collection Added");
          setCollectionName("");
        }
      });

    setCollectionName("");
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
            onKeyDown={submitCollectionName}
            value={collectionName}
          ></input>
        </Container>
      )}
    </>
  );
}

export default AddCollection;
