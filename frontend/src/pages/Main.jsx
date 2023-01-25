import React, { useEffect, useState } from "react";
import { Feed, Header, Navbar, Carrousel, Panel } from "../components";
import { usePostUserContext } from "../contexts/PostUserContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList } = usePostUserContext();
  const [groupId, setGroupId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

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
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        setGroupId={setGroupId}
        setCategoryId={setCategoryId}
      />
      <div className="md:grid md:grid-cols-4">
        <Header darkMode={darkMode} />
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
