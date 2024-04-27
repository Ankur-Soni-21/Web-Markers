import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Container from "../Container";
import { useDispatch, useSelector } from "react-redux";
import { addColl } from "../../features/collSlice";
import { v4 as uuidv4 } from "uuid";
import appwriteService from "../../appwrite/config";

function AddCollection() {
  const [showInput, setShowInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const allCollections = useSelector((state) => state.coll.coll);
  const userId = useSelector((state) => state.auth.userData.$id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      showInput &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
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
  const checkDuplicateCollection = (name) => {
    return allCollections.some(
      (collection) => collection.collection_name === name
    );
  };

  const submitCollectionName = (e) => {
    const res = checkDuplicateCollection(collectionName);
    console.log(res);
    if (res && e.key == "Enter") {
      alert("Collection Already Exists");
      return null;
    }

    console.log(collectionName);
    if (collectionName === "") {
      console.log("Collection name cannot be empty");
      return null;
    }
    if (e.key !== "Enter") return null;

    const newCollectionId = uuidv4();
    console.log("a", newCollectionId);

    appwriteService
      .AddCollection({
        User_ID: userId,
        Collection_Name: collectionName,
        Collection_ID: newCollectionId,
      })
      .then((response) => {
        console.log(response);
        if (response) {
          dispatch(
            addColl({
              collection_name: collectionName,
              collection_id: newCollectionId,
            })
          );
          setShowInput(false);
          console.log("collectionid : ", newCollectionId);
          navigate(`/home/${newCollectionId}`);
          console.log("Collection Added");
          setCollectionName("");
        }
      });
    console.log("collectionid : ", newCollectionId);
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
            onKeyDown={(e) => submitCollectionName(e)}
            value={collectionName}
          ></input>

          {/* <Button className="invi" onClick={submitCollectionName}>Submit</Button> */}
        </Container>
      )}
    </>
  );
}

export default AddCollection;
