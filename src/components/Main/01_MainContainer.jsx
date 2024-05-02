import React, { useEffect } from "react";
import Container from "../Container";
import Header from "../Header/01_Header";
import Bookmarks from "./02_Bookmarks";
import AddBookmark from "./03_AddBookmark";

function MainContainer() {
  useEffect(() => {
    // console.log("MainContainer mounted");
    return () => {
      // console.log("MainContainer unmounted");
    };
  }, []);
  return (
    <Container
      className={`m-2 p-4 w-full h-full min-h-[640px] relative bg-white text-black rounded-lg `}
    >
      <Header></Header>
      <Bookmarks></Bookmarks>
      <AddBookmark />
    </Container>
  );
}

export default MainContainer;
