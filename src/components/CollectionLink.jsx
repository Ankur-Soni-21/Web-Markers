import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function CollectionLink(props) {
  return (
    <Button>
      <span>&#10148;</span>
      <Link to={`/home/${props.collection}`}>{props.collection}</Link>
    </Button>
  );
}

export default CollectionLink;
