import React from "react";
import Container from "../Container";
import Header from "../Header/Header";
import Bookmarks from "./Bookmarks";

function MainContainer() {
  return (
    <Container className={`m-2 p-4 w-3/4 h-4/5 min-h-[640px] max-h-[960px]`}>
      <Header></Header>
      <Bookmarks></Bookmarks>
    </Container>
  );
}

export default MainContainer;
