import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderAdmin } from "..";
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
        console.warn(result);
        setUserCards(result);
      })
      .catch((error) => console.warn(error));
  };

  const addUserInGroup = (idUser) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      userId: idUser,
      groupId: parseInt(groupId, 10),
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
      <HeaderAdmin />
      <input
        className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary flex justify-center "
        type="text"
        placeholder="Rechercher..."
        onChange={handleSearchUserGroup}
        value={searchInput}
      />

      <div className="bg-[#F6F6F6]">
        {searchInput === ""
          ? ""
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
