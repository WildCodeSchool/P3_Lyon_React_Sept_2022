import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import UserCard from "./UserCard";

function AddUserGroup() {
  const [userCard, setUserCard] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchUserGroup = (e) => {
    setSearchInput(e.target.value);
    if (searchInput === "") {
      setUserCard([]);
      return;
    }
    fetch(`http://localhost:5000/api/users/?search=${searchInput}`)
      .then((response) => response.json())
      .then((result) => {
        setUserCard(result);
      })
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
              Utilisatieurs
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
        className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
        type="text"
        placeholder="Rechercher..."
        onChange={handleSearchUserGroup}
        value={searchInput}
      />

      <div className="bg-[#F6F6F6]">
        {searchInput === ""
          ? userCard.map((card) => <UserCard key={card.id} card={card} />)
          : userCard
              .filter(
                (user) =>
                  user.firstname
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase()) ||
                  user.lastname
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
              )
              .map((card) => <UserCard key={card.id} card={card} />)}
      </div>
    </>
  );
}

export default AddUserGroup;
