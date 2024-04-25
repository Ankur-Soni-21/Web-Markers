import React from "react";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
function CollectionHeader({ collection, userId }) {
  const navigate = useNavigate();
  const handleDelete = () => {
    appwriteService
      .RemoveCollection({
        User_ID: userId,
        Collection_Name: collection,
      })
      .then((response) => {
        console.log("Delete Collection Response ", response);
        navigate("/home/all");
      })
      .catch((error) => console.error("Delete Error", error));
  };
  return (
    <Container className={`flex flex-row justify-between items-center my-2`}>
      <Container className={`m-2 p-2`}>
        <h1>{collection}</h1>
      </Container>
      <Container className={`m-1 p-1 flex flex-row gap-1`}>
        <Container className={`m-1 p-1`}>
          <button>Toogle View</button>
        </Container>
        <Container className={`m-1 p-1`}>
          <button onClick={handleDelete}>Delete</button>
        </Container>
      </Container>
    </Container>
  );
}

export default CollectionHeader;
