import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderAdmin } from "..";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";
import { useCurrentUserContext } from "../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function AddUserGroup() {
  const [userCards, setUserCards] = useState([]);

  const [groupList, setGroupList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { token } = useCurrentUserContext;
  const { groupId } = useParams();

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

  useEffect(() => {
    if (searchInput === "") {
      setUserCards([]);
    }
  }, [searchInput]);

  const handleSearchUserGroup = (e) => {
    setSearchInput(e.target.value);
    if (searchInput !== "") {
      fetch(`${backEnd}/api/not-all-users/${searchInput}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserCards(result);
        })
        .catch((error) => console.error(error));
    }
    if (searchInput === "") {
      setUserCards([]);
    }
  };

  const addUserInGroup = (idUser) => {
    const body = JSON.stringify({
      userId: idUser,
      groupId: parseInt(groupId, 10),
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
      redirect: "follow",
    };

    fetch(`${backEnd}/api/user_group`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          response.text();
          toast.success(" Utilisateur ajouté avec succès !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.warn(" L'utilisateur est déjà présent dans ce groupe", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeaderAdmin />
      <div className="font-[Enedis] flex justify-center text-primary text-center text-4xl mb-10">
        {groupList
          .filter((group) => group.id === parseInt(groupId, 10))
          .map((group) => (
            <h3
              key={group.id}
              className=" text-2xl my-4 md:text-3xl bg-violet w-fit rounded-sm"
            >
              {group.group_name}
            </h3>
          ))}
      </div>
      <div className="w-full flex justify-center">
        <input
          className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary flex justify-center "
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearchUserGroup}
          value={searchInput}
        />
      </div>

      <div className="bg-[#F6F6F6]">
        {userCards.map((card) => (
          <UserCard
            key={card.id}
            card={card}
            addUserInGroup={addUserInGroup}
            groupId={groupId}
          />
        ))}
      </div>
    </div>
  );
}

export default AddUserGroup;
