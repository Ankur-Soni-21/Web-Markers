import React, { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";
import { Link } from "react-router-dom";
import Container from "../Container";
import Collections from "./Collections";
import AddCollection from "./AddCollection";

function HeaderBar() {
  return (
    <>
      <Logo></Logo>
      <Container className="flex flex-col items-start py-3">
        <Button>
          <span>&#10148;</span>
          <Link to="/home/all">All Bookmarks</Link>
        </Button>

        <Button>
          <span>&#10148;</span>
          <Link to="/home/unsorted">Unsorted</Link>
        </Button>

        <Button>
          <span>&#10148;</span>
          <Link to="/home/trash">Trash</Link>
        </Button>
      </Container>

      <Container className="my-5 py-5 h-1/2">
        <Collections></Collections>
      </Container>

      <Container>
        <AddCollection></AddCollection>
      </Container>
    </>
  );
}

export default HeaderBar;
