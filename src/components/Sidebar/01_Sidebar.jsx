import React, { useEffect, useState } from "react";
import HeaderBar from "./02_HeaderBar";
import appwriteService from "../../appwrite/config";
import Container from "../Container";
import { useDispatch, useSelector } from "react-redux";
import { setColl } from "../../features/collSlice";

function Sidebar() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData.$id);

  useEffect(() => {
    const fetchCollections = appwriteService.ListCollections({
      User_ID: userId,
    });
    fetchCollections.then((response) => {
      const collections = response.documents.map((doc) => ({
        collection_name: doc.Collection_Name,
        collection_id: doc.$id,
      }));
      console.log("Collections", collections);
      dispatch(setColl(collections));
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <Container
      className={`m-2 p-4 w-1/5 min-w-[240px] h-full min-h-[640px] flex flex-col text-slate-500 `}
    >
      <HeaderBar></HeaderBar>
    </Container>
  ) : (
    // todo : add loading youtube video loader
    <Container className={`m-2 p-4 w-1/4 h-full min-h-640`}>
      <h1>Loading...</h1>
    </Container>
  );
}

export default Sidebar;
