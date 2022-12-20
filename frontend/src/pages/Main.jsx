import React from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Carrousel from "../components/Carrousel/Carrousel";

function Main() {
  return (
    <div>
      <Header />
      <Carrousel />
      <Feed />
    </div>
  );
}

export default Main;
