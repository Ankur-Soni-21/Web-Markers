import React from "react";
import CollectionLink from "../CollectionLink";
import { useSelector } from "react-redux";

function Collections() {
  const collections = useSelector((state) => state.coll.coll).filter(
    (collection) =>
      collection.collection_id !== "1" &&
      collection.collection_id !== "2" &&
      collection.collection_id !== "3"
  );

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
