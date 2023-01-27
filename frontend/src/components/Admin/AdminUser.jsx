import React, { useEffect, useState } from "react";
import axios from "axios";
import pictoGroup from "../../assets/pictoGroup.png";
import croix from "../../assets/close-red.png";
import AddUser from "./AddUser";
import HeaderAdmin from "./HeaderAdmin";
import UserCard from "./UserCard";
import DropDownGroup from "./DropDownGroup";
import { useCurrentUserContext } from "../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function AdminUser() {
  const [addUser, setAddUser] = useState(false);
  const [userCard, setUserCard] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [deleteButton, setDeleteButton] = useState(0);
  const [base, setBase] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const { token } = useCurrentUserContext;

  useEffect(() => {
    fetch(
      fetch(`${backEnd}/api/groups`)
        .then((response) => response.json())
        .then((groups) => {
          setGroupList(groups);
        })
    );
  }, []);

  const backToZero = () => {
    setAddUser(false);
    setSelectedGroup(0);
    setUserCard([]);
    if (base === 0) {
      setRefresh(!refresh);
    } else {
      setBase(0);
    }
  };

  const openAndCloseUserModal = () => {
    if (addUser) {
      setAddUser(false);
      setUserCard([]);
      backToZero();
    } else {
      setAddUser(true);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const toggleRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    if (selectedGroup === 0) {
      fetch(`${backEnd}/api/users/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserCard((prev) => [...prev, ...result]);
        });
    } else {
      fetch(
        `http://localhost:5000/api/user_group/group/${selectedGroup}/limit/${base}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setUserCard((prev) => [...prev, ...result]);
        })
        .catch((error) => console.warn(error));
    }
  }, [refresh, base]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setBase((prev) => prev + 5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGroupSelect = (groupId) => {
    setUserCard([]);
    setSelectedGroup(groupId);
    setDeleteButton(groupId);
    if (base === 0) {
      setRefresh(!refresh);
    } else {
      setBase(0);
    }
  };

  /* const handleDeleteUserGroup = (groupId, userId) => {
    fetch(
      `http://localhost:5000/api/user_group/group/${groupId}/user/${userId}`,
      {
        method: "DELETE",
      }
    )
      .then((result) => {
        setUserCard(result);
      })
      .catch((error) => console.warn(error));
  }; */
  const handleDeleteUserGroup = (groupId, userId) => {
    axios
      .delete(
        `http://localhost:5000/api/user_group/group/${groupId}/user/${userId}`
      )
      .then((result) => {
        toggleRefresh(result);
        console.warn("Utilisateur supprimé du groupe");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex-col justify-around h-screen bg-[#F6F6F6]">
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-10">
        <h3>Gérer la liste des utilisateurs</h3>
      </div>
      <button
        onClick={openAndCloseUserModal}
        type="button"
        className="flex flex-row-reverse justify-between w-[74vw] h-18 items-center ml-14 text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
      >
        Ajouter un utilisateur
        <img className="w-5 h-4 mt-0 mr-3" src={pictoGroup} alt="" />
      </button>
      {addUser ? <AddUser openAndCloseUserModal={openAndCloseUserModal} /> : ""}
      <div className="flex flex-col justify-center w-screen items-center">
        <DropDownGroup setGroupId={handleGroupSelect} />

        {selectedGroup > 0 && (
          <div className="flex justify-center">
            <h2 className="text-primary text-center text-xl mb-4 md:text-3xl">
              Groupe :
              {groupList
                .filter((group) => group.id === selectedGroup)
                .map((group) => group.group_name)}
            </h2>
            <button type="button" onClick={backToZero}>
              <img
                src={croix}
                alt="croix rouge pour effacer"
                className="h-5 w-5 ml-4 mb-3"
              />
            </button>
          </div>
        )}
      </div>

      <div className=" flex justify-around mt-6 ">
        <input
          className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearch}
          value={searchInput}
        />
      </div>

      <div className="bg-[#F6F6F6]">
        {userCard
          .filter(
            (user) =>
              user.firstname
                .toLocaleLowerCase()
                .includes(searchInput.toLocaleLowerCase()) ||
              user.lastname
                .toLocaleLowerCase()
                .includes(searchInput.toLocaleLowerCase())
          )
          .map((card) => (
            <UserCard
              key={card.id}
              card={card}
              toggleRefresh={toggleRefresh}
              deleteUserGroup={handleDeleteUserGroup}
              deleteButton={deleteButton}
            />
          ))}
      </div>
    </div>
  );
}
