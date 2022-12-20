import React from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";

function Main() {
  return (
    <div>
      <Navbar />
      <Header />
      <Feed />
    </div>
  );
}

export default Main;
