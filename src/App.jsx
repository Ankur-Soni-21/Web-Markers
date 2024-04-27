import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/01_Sidebar";

import { login } from "./features/authSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import MainContainer from "./components/Main/01_MainContainer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        console.log(response);
        dispatch(login(response));
        setLoading(false);
      })
      .catch((error) => {
        console.log("App :: useEffect :: error", error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-dvh overflow-hidden flex flex-row">
      <Sidebar />
      <main>
        <Outlet />
      </main>
      {/* // remove main container. it will be rendered by the outlet
      // similarly the container for Add bookmark container */}
      <MainContainer />
    </div>
  );
}

export default App;
