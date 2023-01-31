import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";

function AddUserGroup() {
  const [userCards, setUserCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { groupId } = useParams();

  const handleSearchUserGroup = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === "") {
      setUserCards([]);
      return;
    }
    fetch(`http://localhost:5000/api/users/?search=${searchInput}`)
      .then((response) => response.json())
      .then((result) => {
        setUserCards(result);
      })
      .catch((error) => console.warn(error));
  };

  const addUserInGroup = (idUser) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      user_id: idUser,
      group_id: parseInt(groupId, 10),
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/user_group", requestOptions)
      .then((response) => console.warn(response.json()))
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <Navbar />
      <div className="flex-col justify-around">
        <h2 className="font-[Enedis] text-[#95CD31] font-bold text-center text-4xl">
          Espace admin
        </h2>
        <div className="flex justify-around mt-8">
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mb-6 mt-6 border-primary rounded-2xl "
          >
            Publications
          </button>
          <Link to="/adminUser">
            <button
              type="button"
              className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
            >
              Utilisateurs
            </button>
          </Link>
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[26vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
          >
            Espaces
          </button>
        </div>
      </div>
      <input
        className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary flex justify-center "
        type="text"
        placeholder="Rechercher..."
        onChange={handleSearchUserGroup}
        value={searchInput}
      />

      <div className="bg-[#F6F6F6]">
        {searchInput === ""
          ? userCards.map((card) => (
              <UserCard
                key={card.id}
                card={card}
                addUserGroup={addUserInGroup}
              />
            ))
          : userCards
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
                  addUserInGroup={addUserInGroup}
                  groupId={groupId}
                />
              ))}
      </div>
    </>
  );
}

export default AddUserGroup;
