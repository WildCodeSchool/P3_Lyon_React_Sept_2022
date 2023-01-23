import React, { useEffect, useState } from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";
import { usePostUserContext } from "../contexts/PostUserContext";
import Panel from "../components/Feed/PostContainer/Panel";

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList } = usePostUserContext();
  const [groupId, setGroupId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

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
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        setGroupId={setGroupId}
        setCategoryId={setCategoryId}
      />
      <div className="md:grid md:grid-cols-4">
        <Header />
        <Carrousel
          groupId={groupId}
          setGroupId={setGroupId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <Feed groupId={groupId} categoryId={categoryId} />
        <Panel />
      </div>
    </div>
  );
}

export default Main;
