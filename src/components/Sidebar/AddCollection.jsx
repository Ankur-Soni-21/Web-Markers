import React, { useState } from "react";
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

  const addCollection = () => {
    setShowInput(true);
  };

  const submitCollectionName = () => {
    if (collectionName === "") {
      console.log("Collection name cannot be empty");
      return;
    }
    setCollectionId((s) => ID.unique());

    appwriteService
      .AddCollection({
        User_ID: userId,
        Collection_Name: collectionName,
        Collection_ID: collectionId,
      })
      .then((response) => {
        console.log(response);
        dispatch(
          addColl({
            collection_name: collectionName,
            collection_id: collectionId,
          })
        );
        setShowInput(false);
        navigate(`/home/${collectionName}`);
      });

    console.log("Collection Added");
    setCollectionName((s) => "");
    setCollectionId((s) => "");
  };
  return (
    <>
      <Button onClick={addCollection}>
        <span>&#10148; Add New Collection</span>
      </Button>

      {showInput && (
        <Container className="flex flex-row items-center box-border px-2">
          <input
            type="text"
            placeholder="Collection Name"
            className="text-black"
            onChange={(e) => setCollectionName(e.target.value)}
          ></input>

          <Button onClick={submitCollectionName}>Submit</Button>
        </Container>
      )}
    </>
  );
}

export default AddCollection;
