import React, { useState } from "react";
import Container from "../Container";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addBookmark } from "../../features/bookSlice";
import conf from "../../conf/conf";
import { useParams } from "react-router-dom";
import spinner from "../../assets/spinner.svg";

function AddForm() {
  const collections = useSelector((state) => state.coll.coll).filter(
    (collection) =>
      collection.collection_id !== "1" && collection.collection_id !== "3"
  );
  const userId = useSelector((state) => state.auth.userData.$id);
  const dispatch = useDispatch();
  const params = useParams();
  const defaultCollection = params;

  const [selectedColl, setSeletedColl] = useState("Unsorted");
  const [collectionId, setCollectionId] = useState("2");
  const [url, setUrl] = useState("");
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${conf.jsonLinkMetaDataKey}`;
  const [isAdding, setIsAdding] = useState(false);

  const getDate = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    //console.log(formattedDate);
    return formattedDate;
  };

  const setCollectionData = (e) => {
    setSeletedColl(e.target.value);
    //console.log(e);
    const selectedOption =
      e.target.selectedOptions[0].getAttribute("data-collection");
    //console.log(selectedOption);
    setCollectionId(selectedOption);
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
    if (!isValidUrl(url) || url === "" || !url) {
      alert("Invalid URL");
      return;
    }
    setIsAdding(true);
    //console.log("Collection ID [add bookmark]:", collectionId);
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
            Collection_ID: collectionId,
          })
          .then((response) => {
            //console.log(response);
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
                collectionId: response.Collection_ID,
                createdAt: getDate(),
              })
            );
            setIsAdding(false);
            setUrl("");
          })
          .catch((error) => {
            //console.log(error);
            setIsAdding(false);
          });
      });
  };

  return (
    <Container className={`p-2 m-2 flex flex-col gap-2 `}>
      <Container className={`flex gap-2 items-center p-1 justify-between `}>
        <label className="w-20 text-slate-600 font-bold" htmlFor="url">
          URL:
        </label>
        <input
          type="text"
          id="url"
          placeholder="Enter bookmark URL"
          className="p-1 m-1 text-black w-64 outline-none rounded-md pl-2"
          required
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        ></input>
      </Container>
      <Container className={`flex gap-2 p-1 items-center justify-between`}>
        <label className="w-24 text-slate-600 font-bold" htmlFor="collection">
          Collection :{" "}
        </label>
        <select
          defaultValue={defaultCollection ?? collections[0].collection_name}
          className=" px-1 text-slate-500 m-1 w-64 outline-none rounded-md py-2"
          id="collection"
          onChange={(e) => setCollectionData(e)}
        >
          {collections.map((collection) => (
            <option
              key={collection.collection_id}
              data-collection={collection.collection_id}
              value={collection.collection_name}
              className="text-black"
            >
              {collection.collection_name}
            </option>
          ))}
        </select>
      </Container>
      <button
        onClick={handleAddBookmark}
        className="rounded-lg bg-slate-700 text-white py-2 my-2 h-12"
      >
        {!isAdding ? (
          <span>Add Bookmark</span>
        ) : (
          <span className="flex flex-row gap-2 justify-center items-center">
            <img src={spinner} alt="" className="w-8 h-8 animate-spin" />
            Adding...
          </span>
        )}
      </button>
    </Container>
  );
}

export default AddForm;
