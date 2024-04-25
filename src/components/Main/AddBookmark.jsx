import React, { useState } from "react";
import Container from "../Container";
import AddForm from "./AddForm";

function AddBookmark() {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddBookmark = () => {
    setIsAdding(!isAdding);
  };
  return !isAdding ? (
    <Container className={`w-max absolute bottom-2 right-2 m-2 flex flex-col`}>
      <button className="py-6 px-8" onClick={handleAddBookmark}>
        +
      </button>
    </Container>
  ) : (
    <>
      <Container className={`absolute bottom-20 right-2 my-8 mx-2`}>
        <AddForm></AddForm>
      </Container>
      <Container
        className={`w-max absolute bottom-2 right-2 m-2 flex flex-col`}
      >
        <button className="py-6 px-8 " onClick={handleAddBookmark}>
          x
        </button>
      </Container>
    </>
  );
}

export default AddBookmark;
