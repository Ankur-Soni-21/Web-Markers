import React, { useState } from "react";
import Container from "../Container";

function SearchBar() {
  const [query, setQuery] = useState(null);
  const handleSubmit = (e) => {
    if (e.key == "Enter"){
        // steps
        // navigate to all bookmarks
        // change the params 
    }
  };
  return (
    <Container
      className={`p-2 m-2 w-3/5 max-w-96 bg-slate-200 rounded-lg flex flex-row items-center jusify-around px-3 gap-2`}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search.."
        className="bg-slate-200 outline-none"
        onKeyDown={(e) => handleSubmit(e)}
      ></input>
    </Container>
  );
}

export default SearchBar;
