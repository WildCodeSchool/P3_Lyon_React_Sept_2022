import React, { useEffect } from "react";
// eslint-disable-next-line import/no-named-as-default-member
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import { usePostUserContext } from "../contexts/PostUserContext";

function Main() {
  const { setValueGroupe, setValueCategory } = usePostUserContext();

  useEffect(() => {
    fetch("http://localhost:5000/api/groups")
      .then((response) => response.json())
      .then((groups) => {
        setValueGroupe(groups);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories ")
      .then((response) => response.json())
      .then((categories) => {
        setValueCategory(categories);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Feed />
    </div>
  );
}

export default Main;
