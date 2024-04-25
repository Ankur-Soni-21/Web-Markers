import React from "react";
import CollectionLink from "../CollectionLink";
import { useSelector } from "react-redux";

function Collections() {
  const collections = useSelector((state) => state.coll.coll);

  return (
    <>
      {collections.map((collection) => (
        <CollectionLink
          key={collection.collection_id}
          collection={collection.collection_name}
        ></CollectionLink>
      ))}
    </>
  );
}

export default Collections;
