import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pictoGroup from "../../assets/pictoGroup.png";
import AddUser from "./AddUser";
import UserCard from "./UserCard";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function AdminUser() {
  const [addUser, setAddUser] = useState(false);
  const [userCard, setUserCard] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const openAndCloseUserModal = () => {
    setAddUser(!addUser);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const toggleRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    if (!addUser) {
      fetch(`${backEnd}/api/users`)
        .then((response) => response.json())
        .then((result) => {
          setUserCard(result);
        });
    }
  }, [addUser, refresh]);

  return (
    <div className="flex-col justify-around h-screen bg-[#F6F6F6]">
      <h2 className="font-[Enedis] text-[#95CD31] font-bold text-center text-4xl">
        Espace admin
      </h2>
      <div className="flex justify-around mt-6 mb-5">
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
            <UserCard key={card.id} card={card} toggleRefresh={toggleRefresh} />
          ))}
      </div>
    </div>
  );
}
