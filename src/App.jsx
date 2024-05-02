import React, { useEffect, useState } from "react";
import { login } from "./features/authSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        navigate("/home/1");
        // console.log(response);
        dispatch(login(response));
        setLoading(false);
      })
      .catch((error) => {
        navigate("/login");
        console.log("App :: useEffect :: error", error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    // make a loader
    <div>Loading...</div>
  ) : (
    <div className="h-dvh overflow-hidden flex flex-row">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
