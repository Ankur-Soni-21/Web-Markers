import React, { useState, useRef, useEffect } from "react";
import Container from "../Container";
import AddForm from "./05_AddForm";

function AddBookmark() {
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isAdding]);

  const handleClickOutside = (event) => {
    if (isAdding && inputRef && !inputRef.current.contains(event.target)) {
      setIsAdding(false);
    }
  };

  const handleAddBookmark = () => {
    setIsAdding(!isAdding);
  };
  return !isAdding ? (
    <Container
      className={`w-max absolute bottom-10 right-10 m-2 flex flex-col`}
    >
      <button
        className="transition-all duration-200 ease-in py-10 px-12 bg-slate-800 rounded-lg hover:bg-slate-600 text-white"
        onClick={handleAddBookmark}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </Container>
  ) : (
    <div ref={inputRef}>
      <Container
        className={`absolute bottom-36 right-8 rounded-lg my-8 mx-2 bg-slate-300 shadow-md shadow-slate-400`}
      >
        <AddForm></AddForm>
      </Container>
      <Container
        className={`w-max absolute bottom-10 right-10 m-2 flex flex-col`}
      >
        <button
          className="transition-all duration-200 ease-in py-10 px-12 bg-slate-800 rounded-lg hover:bg-slate-600 text-white "
          onClick={handleAddBookmark}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Container>
    </div>
  );
}

export default AddBookmark;
