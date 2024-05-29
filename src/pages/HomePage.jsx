import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/01_Sidebar";
import MainContainer from "../components/Main/01_MainContainer";
import Container from "../components/Container";

import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import spinner from "../assets/spinner.svg";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((response) => {
        if (response === null) {
          navigate("/login");
          console.log("App :: useEffect :: response", response);
          setLoading(false);
          return;
        } else {
          navigate("/home/1");
          console.log("App :: useEffect :: response", response);
          dispatch(login(response));
          setLoading(false);
        }
      })
      .catch((error) => {
        navigate("/login");
        console.log("App :: useEffect :: error", error);
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <Container className={`flex flex-row h-full`}>
      <Sidebar />
      <MainContainer />
    </Container>
  ) : (
    <Container className={"flex-col justify-center h-full"}>
      <span className="flex items-center justify-center gap-2 h-full">
        <img className="h-32 w-32 animate-spin" src={spinner} alt="loading" />
      </span>
    </Container>
  );
}

export default HomePage;
