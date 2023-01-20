import React, { useEffect } from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";
import { usePostUserContext } from "../contexts/PostUserContext";
import Panel from "../components/Feed/PostContainer/Panel";

function Main() {
  const { setGroupList, setCategoryList } = usePostUserContext();

  useEffect(() => {
    fetch("http://localhost:5000/api/groups")
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategoryList(categories);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="md:grid md:grid-cols-4">
        <Header />
        <Carrousel />
        <Feed />
        <Panel />
      </div>
    </div>
  );
}

export default Main;
