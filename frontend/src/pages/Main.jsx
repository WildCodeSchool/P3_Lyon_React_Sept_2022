import React, { useEffect, useState } from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Carrousel from "../components/Carrousel/Carrousel";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";
import Panel from "../components/Feed/PostContainer/Panel";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import CarrouselAdmin from "../components/Admin/CarrouselAdmin";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList } = usePostUserContext();
  const { user } = useCurrentUserContext();
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
        {user.is_admin ? (
          <>
            <HeaderAdmin />
            <CarrouselAdmin
              groupId={groupId}
              setGroupId={setGroupId}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </>
        ) : (
          <>
            <Header darkMode={darkMode} />
            <Carrousel
              groupId={groupId}
              setGroupId={setGroupId}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </>
        )}

        <Feed groupId={groupId} categoryId={categoryId} />
        <Panel />
      </div>
    </div>
  );
}

export default Main;
