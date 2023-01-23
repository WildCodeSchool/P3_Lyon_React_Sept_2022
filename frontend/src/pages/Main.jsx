import React, { useEffect } from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";
import { usePostUserContext } from "../contexts/PostUserContext";
import Panel from "../components/Feed/PostContainer/Panel";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList } = usePostUserContext();

  useEffect(() => {
    fetch(`${backEnd}/api/groups`)
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch(`${backEnd}/api/categories`)
      .then((response) => response.json())
      .then((categories) => {
        setCategoryList(categories);
      });
  }, []);

  return (
    <div>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="md:grid md:grid-cols-4">
        <Header darkMode={darkMode} />
        <Carrousel />
        <Feed />
        <Panel />
      </div>
    </div>
  );
}

export default Main;
