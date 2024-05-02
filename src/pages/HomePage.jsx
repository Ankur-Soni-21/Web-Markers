import React from "react";
import Sidebar from "../components/Sidebar/01_Sidebar";
import MainContainer from "../components/Main/01_MainContainer";
import Container from "../components/Container";

function HomePage() {
  return (
    <Container className={`flex flex-row h-full`}>
      <Sidebar />
      <MainContainer />
    </Container>
  );
}

export default HomePage;
