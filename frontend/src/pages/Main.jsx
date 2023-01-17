import React, { useEffect } from "react";
// eslint-disable-next-line import/no-named-as-default-member
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";
import { usePostUserContext } from "../contexts/PostUserContext";

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
      <Header />
      <Carrousel />
      <Feed />
    </div>
  );
}

export default Main;
