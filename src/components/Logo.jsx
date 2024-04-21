import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Logo() {
  return (
    <Link to="/" className="p-2 m-2">
      <div>
        <img
          className="w-10 h-10"
          src={logo}
          alt="website logo"
          style={{ fill: "white" }}
        />
      </div>
    </Link>
  );
}

export default Logo;
