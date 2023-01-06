import React from "react";
// eslint-disable-next-line import/no-named-as-default-member
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";

function Main() {
  return (
    <div>
      <Navbar />
      <Header />
      <Carrousel />
      <Feed />
    </div>
  );
}

export default Main;
