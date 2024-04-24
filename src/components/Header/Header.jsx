import React from "react";
import Container from "../Container";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <Container className={`flex flex-row justify-between p-2`}>
      <SearchBar></SearchBar>
    </Container>
  );
}

export default Header;
