import React, { useState } from "react";
import Container from "./Container";
import appwriteService from "../appwrite/config";

function BookmarkLink({ bookmark }) {
  const [book, setBook] = useState(bookmark);

  const handleDelete = () => {
    appwriteService
      .RemoveBookmark({
        Bookmark_ID: book.$id,
      })
      .then((res) => {
        console.log("Delete Bookmark : ", res);
        setBook(null);
      })
      .catch((error) => console.log(error));
  };

  return book ? (
    <Container className={`flex flex-row justify-between `}>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={book.URL}
        className="w-full"
      >
        <Container
          className={`flex flex-row p-2 my-2 gap-2 hover:bg-slate-600 w-full`}
        >
          <Container>
            <img src={book.imageURL} alt={book.title} />
          </Container>

          <Container className={`flex flex-col gap-2 w-full`}>
            <Container className={`m-1 p-1`}>
              <h1>{book.title}</h1>
            </Container>
            <Container className={`m-1 p-1`}>
              <h1>{book.description}</h1>
            </Container>
            <Container className={`flex-row gap-2 flex p-1 m-1`}>
              <span>Created At : {book.createdAt}</span>
              <span>{book.URL}</span>
            </Container>
          </Container>
        </Container>
      </a>
      <Container
        className={`flex flex-row w-1/5 gap-3 justify-between p-2 m-2 flex-wrap`}
      >
        <Container
          className={`flex justify-center p-2  flex-wrap hover:bg-slate-400`}
        >
          <button onClick={handleDelete}>Delete</button>
        </Container>
        <Container className={`flex justify-center p-2  flex-wrap`}>
          <button>Share</button>
        </Container>
        <Container className={`flex justify-center p-2  flex-wrap`}>
          <button>Options</button>
        </Container>
      </Container>
    </Container>
  ) : null;
}

export default BookmarkLink;
