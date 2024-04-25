import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import Container from "./Container";

function Logo() {
  return (
    <Link to="/" className="m-1">
      <Container className={`p-2 m-1 w-max`}>
        <img
          className="w-10 h-10"
          src={logo2}
          alt="website logo"
          style={{ fill: "white" }}
        />
      </Container>
    </Link>
  );
}

export default Logo;
