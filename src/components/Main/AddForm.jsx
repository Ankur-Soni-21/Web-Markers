import React, { useEffect, useState } from "react";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addBookmark } from "../../features/bookSlice";
import conf from "../../conf/conf";
import { useParams } from "react-router-dom";

function AddForm() {
  const collections = useSelector((state) => state.coll.coll);
  const userId = useSelector((state) => state.auth.userData.$id);
  const dispatch = useDispatch();
  const params = useParams();
  const defaultCollection = params;

  const [selectedColl, setSeletedColl] = useState(
    collections[0].collection_name
  );
  const [url, setUrl] = useState(null);
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${conf.jsonLinkMetaDataKey}`;
  const [isAdding, setIsAdding] = useState(false);

  const getDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);
    return formattedDate;
  };

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleAddBookmark = () => {
    if (!url) return;
    if (!isValidUrl(url)) {
      alert("Invalid URL");
      return;
    }
    setIsAdding(true);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          setIsAdding(false);
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        appwriteService
          .AddBookmark({
            User_ID: userId,
            Collection_Name: selectedColl,
            URL: url,
            Image_URL: data.images[0],
            Title: data.title,
            Description: data.description,
            Starred: false,
            Is_Collection: false,
          })
          .then((response) => {
            console.log(response);
            dispatch(
              addBookmark({
                $id: response.$id,
                userId: response.User_ID,
                collectionName: response.Collection_Name,
                title: response.Title,
                description: response.Description,
                starred: false,
                URL: response.URL,
                imageURL: response.Image_URL,
                createdAt: getDate(),
              })
            );
            setIsAdding(false);
            setUrl(null);
          })
          .catch((error) => {
            console.log(error);
            setIsAdding(false);
          });
      });
  };

  return (
    <Container className={`p-2 m-2 flex flex-col gap-2`}>
      <Container className={`flex gap-2 items-center p-1 justify-between`}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          placeholder="Enter bookmark URL"
          className="p-1 m-1 text-black"
          required
          onChange={(e) => setUrl(e.target.value)}
        ></input>
      </Container>
      <Container className={`flex gap-2 p-1 items-center justify-between`}>
        <label htmlFor="collection">Collection : </label>
        <select
          defaultValue={defaultCollection ?? collections[0].collection_name}
          className="text-black p-1 m-1"
          id="collection"
          onChange={(e) => setSeletedColl(e.target.value)}
        >
          {collections.map((collection) => (
            <option
              key={collection.collection_id}
              value={collection.collection_name}
              className="text-black"
            >
              {collection.collection_name}
            </option>
          ))}
        </select>
      </Container>
      <button onClick={handleAddBookmark}>
        {!isAdding ? <span>Add</span> : <span>Adding...</span>}
      </button>
    </Container>
  );
}

export default AddForm;
