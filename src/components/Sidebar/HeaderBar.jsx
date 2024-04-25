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
          <i className="fa-regular fa-bookmark w-6"></i>
          <Link to="/home/all">All Bookmarks</Link>
        </Button>

        <Button>
          <i className="fa-solid fa-box-open w-6"></i>
          <Link to="/home/unsorted">Unsorted</Link>
        </Button>

        <Button>
          <i className="fa-solid fa-trash w-6"></i>
          <Link to="/home/trash">Trash</Link>
        </Button>
      </Container>

      <Container className="my-5 py-5 h-1/2">
        <h1 className="mx-1 my-3 p-1 text-gray-50 underline-offset-4 underline">
          My Collections
        </h1>
        <Collections></Collections>
      </Container>

      <Container>
        <AddCollection></AddCollection>
      </Container>
    </>
  );
}

export default HeaderBar;
