import React, { useState } from "react";
import Container from "./Container";
import appwriteService from "../appwrite/config";

function BookmarkLink({ bookmark, viewStyle }) {
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

  const shortenURL = (url) => {
    const parsedURL = new URL(url);
    return parsedURL.hostname;
  };

  return book ? (
    <Container className={`flex flex-row justify-between max-h-[120px] ml-10`}>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={book.URL}
        className="w-full"
      >
        <Container
          className={`flex flex-row p-2 my-2 gap-2 hover:bg-slate-200 rounded-2xl w-full h-full`}
        >
          <Container
            className={`rounded-lg border-2 border-slate-200 w-24 h-24 `}
          >
            <img className="w-24 h-24 object-fill" src={book.imageURL} alt={book.title} />
          </Container>

          <Container className={`flex flex-col gap-2 ml-3 w-full `}>
            <Container className={``}>
              <h1 className="font-black text-lg">{book.title}</h1>
            </Container>

            <Container className={`text-slate-400`}>
              <h1>{book.description}</h1>
            </Container>

            <Container className={`flex-row gap-2 flex text-slate-400`}>
              <span className="border-r-2 pr-2 border-slate-400">
                {book.createdAt}
              </span>
              <span>{shortenURL(book.URL)}</span>
            </Container>
          </Container>
        </Container>
      </a>
      <Container
        className={`flex flex-row w-1/5 gap-3 justify-between p-2 m-2 flex-wrap`}
      >
        <Container className={`flex justify-center flex-wrap items-center`}>
          <button
            onClick={handleDelete}
            className=" hover:bg-slate-200 h-max p-2 rounded-lg"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </Container>
        <Container className={`flex justify-center flex-wrap items-center`}>
          <button className=" hover:bg-slate-200 h-max p-2 rounded-lg">
            <i className="fa-solid fa-share"></i>
          </button>
        </Container>
        <Container className={`flex justify-center flex-wrap items-center`}>
          <button className=" hover:bg-slate-200 h-max p-2 rounded-lg">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </Container>
      </Container>
    </Container>
  ) : null;
}

export default BookmarkLink;
