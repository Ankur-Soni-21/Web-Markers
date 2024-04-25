import React from "react";
import Container from "../Container";
import Header from "../Header/Header";
import Bookmarks from "./Bookmarks";
import AddBookmark from "./AddBookmark";

function MainContainer() {
  return (
    <Container
      className={`m-2 p-4 w-full h-full min-h-[640px] relative bg-slate-100 text-black rounded-lg `}
    >
      <Header></Header>
      <Bookmarks></Bookmarks>
      <AddBookmark />
    </Container>
  );
}

export default MainContainer;
