import React from "react";
import Container from "../Container";
import SearchBar from "./02_SearchBar";
import UserProfile from "./03_UserProfile";

function Header() {
  return (
    <Container className={`flex flex-row justify-between p-2`}>
      <SearchBar></SearchBar>
      <UserProfile></UserProfile>
    </Container>
  );
}

export default Header;
