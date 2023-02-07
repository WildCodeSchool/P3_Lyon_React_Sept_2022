import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import pictoGroup from "../../assets/pictoGroup.png";
import addUserGroup from "../../assets/add-user.png";
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
  const { token } = useCurrentUserContext();

  useEffect(() => {
    fetch(`${backEnd}/api/groups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
  }, []);

  const backToZero = () => {
    setAddUser(false);
    setSelectedGroup(0);
    setUserCard([]);
    setSearchInput("");
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
    if (selectedGroup === 0 && searchInput === "") {
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
        })
        .catch((error) => console.error(error));
    } else if (selectedGroup === 0 && searchInput !== "") {
      fetch(`${backEnd}/api/not-all-users/${searchInput}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserCard(result);
        })
        .catch((error) => console.error(error));
    } else if (selectedGroup > 0 && searchInput === "") {
      fetch(`${backEnd}/api/user_group/group/${selectedGroup}/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserCard((prev) => [...prev, ...result]);
        })
        .catch((error) => console.error(error));
    } else if (selectedGroup > 0 && searchInput !== "") {
      fetch(`${backEnd}/api/user_group/group/${selectedGroup}/${searchInput}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserCard(result);
        })
        .catch((error) => console.error(error));
    }
  }, [refresh, base, searchInput]);

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

  const deleteUserList = () => {
    setUserCard([]);
  };

  /* const handleDeleteUserGroup = (groupId, userId) => {
    fetch(
      `http://${backEnd}/api/user_group/group/${groupId}/user/${userId}`,
      {
        method: "DELETE",
      }
    )
      .then((result) => {
        setUserCard(result);
      })
      .catch((error) => console.error(error));
  }; */
  const handleDeleteUserGroup = (groupId, userId) => {
    axios
      .delete(`${backEnd}/api/user_group/group/${groupId}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        toggleRefresh(result);
        toast.success(" Utilisateur supprimé du groupe !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleSearchUserGroup = () => {
  //   fetch(`${backEnd}/api/users`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setUserCard(result);
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <div className="flex-col justify-around h-screen md:overflow-x-hidden">
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-10 mt-5 xl:mt-10">
        <h3>Gérer la liste des utilisateurs</h3>
      </div>
      <button
        onClick={openAndCloseUserModal}
        type="button"
        className="flex flex-row-reverse justify-between w-80 h-18 items-center mx-auto text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
      >
        Ajouter un utilisateur
        <img className="w-5 h-5 mt-0 mr-3" src={pictoGroup} alt="Add user" />
      </button>

      {addUser ? <AddUser openAndCloseUserModal={openAndCloseUserModal} /> : ""}
      <div className="flex flex-col justify-center w-screen items-center">
        <div className="flex justify-center">
          <DropDownGroup setGroupId={handleGroupSelect} groupList={groupList} />
          {selectedGroup > 0 && (
            <Link to={`/admin/add-user-group/${selectedGroup}`}>
              <button type="button">
                <img
                  className="w-7 h-7 md:w-10 md:h-10 mt-4 md:mt-2 ml-3 md:ml-0"
                  alt="Add user group"
                  src={addUserGroup}
                />
              </button>
            </Link>
          )}
        </div>

        {selectedGroup > 0 && (
          <div className="flex justify-center">
            <h2 className="text-primary text-center text-2xl mb-4  my-4 md:text-3xl bg-violet w-fit rounded-sm">
              {groupList
                .filter((group) => group.id === selectedGroup)
                .map((group) => group.group_name)}
            </h2>
            <button type="button" onClick={backToZero}>
              <img
                src={croix}
                alt="croix rouge pour effacer"
                className="h-5 w-5 ml-4 "
              />
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        <input
          className="w-80 md:w-[30vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearch}
          value={searchInput}
        />
      </div>

      <div className="bg-[#F6F6F6] pb-2">
        {userCard.map((card) => (
          <UserCard
            key={card.id}
            card={card}
            toggleRefresh={toggleRefresh}
            deleteUserGroup={handleDeleteUserGroup}
            deleteButton={deleteButton}
            deleteUserList={deleteUserList}
          />
        ))}
      </div>
    </div>
  );
}
