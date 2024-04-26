import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import Container from "./Container";

function Logo() {
  return (
    <Link to="/" className="m-1">
      <Container className={`p-2 m-1 mb-10 w-max`}>
        <img
          className="w-12 h-12 fill-slate-400"
          src={logo2}
          alt="website logo"
          
        />
      </Container>
    </Link>
  );
}

export default Logo;
