import React, { useState } from "react";
import Container from "../Container";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterBookmarks } from "../../features/bookSlice";
function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    //console.log("query:", e.target.value);
    navigate(`/home/1/${e.target.value}`);
    dispatch(filterBookmarks(e.target.value));
  };
  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      //console.log(e.key);
      //console.log("query", e.target.value);
      navigate(`/home/1/${e.target.value}`);
      dispatch(filterBookmarks(e.target.value));
    }
  };
  return (
    <Container
      className={`p-2 m-2 w-3/5 max-w-96 bg-slate-200 rounded-lg flex flex-row items-center jusify-around px-3 gap-2`}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) => handleNavigate(e)}
        placeholder="Search.."
        className="bg-slate-200 outline-none"
        onKeyDown={(e) => handleSubmit(e)}
      ></input>
    </Container>
  );
}

export default SearchBar;
