import React, { useState } from "react";
import Container from "./Container";
import appwriteService from "../appwrite/config";
import spinner from "../assets/spinner.svg";
import { moveToTrash } from "../features/bookSlice";
import { useDispatch } from "react-redux";
import tempImage from "../assets/logo2.svg";

function BookmarkLink({ bookmark, viewStyle }) {
  const [book, setBook] = useState(bookmark);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();

  const deletePermanently = () => {
    setDeleting(true);
    appwriteService
      .RemoveBookmark({ Bookmark_ID: book.$id })
      .then((res) => {
        console.log("Delete Bookmark : ", res);
        setBook(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const handleMoveToTrash = () => {
    setDeleting(true);
    appwriteService
      .UpdateBookmark({
        Bookmark_ID: book.$id,
        Collection_Name: "Trash",
        Collection_ID: "3",
      })
      .then((res) => {
        console.log("Delete Bookmark : ", res);
        setBook(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeleting(false);
      });

    dispatch(moveToTrash(book.$id));
  };

  const handleDelete = () => {
    if (book.collectionId === "3") {
      deletePermanently();
    } else {
      handleMoveToTrash();
    }
  };

  const handleOpenInNewTab = () => {
    window.open(book.URL, "_blank");
  };

  const shortenURL = (url) => {
    const parsedURL = new URL(url);
    return parsedURL.hostname;
  };

  return book ? (
    <Container
      className={`flex flex-row justify-between max-h-[120px] pl-10 rounded-2xl border-slate-300 pb-4  hover:bg-slate-200 `}
    >
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={book.URL}
        className="w-full"
      >
        <Container className={`flex flex-row p-2 my-2 gap-2  w-full h-full`}>
          <Container
            className={`rounded-lg border-2 border-slate-200 w-24 h-24 `}
          >
            <img
              className="w-24 h-24 object-fill"
              src={book.imageURL || tempImage}
              alt={book.title}
            />
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
        className={`flex flex-row w-1/5 gap-1 justify-around p-2 m-2 flex-wrap max-w-48`}
      >
        <Container className={`flex justify-center flex-wrap items-center`}>
          {deleting ? (
            <button
              className=" bg-slate-600 h-max p-2 rounded-lg"
              title="Delete"
            >
              <img
                className="w-5 h-5 animate-spin"
                src={spinner}
                alt="website logo"
              />
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className=" hover:bg-slate-300 h-max p-2 rounded-lg"
              title="Delete"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </Container>
        <Container className={`flex justify-center flex-wrap items-center`}>
          <button
            className=" hover:bg-slate-300 h-max p-2 rounded-lg"
            onClick={handleOpenInNewTab}
            title="Open in new tab"
          >
            <i className="fa-solid fa-share"></i>
          </button>
        </Container>

        <Container className={`flex justify-center flex-wrap items-center`}>
          <button
            className=" hover:bg-slate-300 h-max p-2 rounded-lg"
            title="More options"
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </Container>
      </Container>
    </Container>
  ) : null;
}

export default BookmarkLink;
