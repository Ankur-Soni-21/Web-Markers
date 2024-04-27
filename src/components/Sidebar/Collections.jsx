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
          collectionName={collection.collection_name}
          collectionId={collection.collection_id}
        ></CollectionLink>
      ))}
    </>
  );
}

export default Collections;
