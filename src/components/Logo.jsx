import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Logo() {
  return (
    <Link to="/" className="m-1">
      <div>
        {/* <img
          className="w-10 h-10"
          src={logo}
          alt="website logo"
          style={{ fill: "white" }}
        /> */}
        <h1 className="text-white text-2xl">Web Markers</h1>
      </div>
    </Link>
  );
}

export default Logo;
