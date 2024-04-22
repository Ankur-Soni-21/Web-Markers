import React, { useEffect, useState } from "react";
import AuthForm from "./components/testComponentAuth";
import MetaDataForm from "./components/testComponentBookmark";
import Sidebar from "./components/Sidebar/Sidebar";

import { login } from "./features/authSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        console.log(response);
        dispatch(login(response));
        setLoading(false); // Set loading to false after fetching user data
      })
      .catch((error) => {
        console.log("App :: useEffect :: error", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="h-dvh overflow-hidden">
      {!loading && <Sidebar />}{" "}
      {/* Render Sidebar only when loading is false */}
      {/* <AuthForm></AuthForm>
      <MetaDataForm></MetaDataForm> */}
    </div>
  );
}

export default App;
