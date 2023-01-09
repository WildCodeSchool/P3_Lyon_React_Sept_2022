import React from "react";
import { Link } from "react-router-dom";
import pictoGroup from "../../assets/pictoGroup.png";
import DropDownTeam from "./DropDownTeam";

export default function AdminUser() {
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
      <div className="flex flex-row-reverse justify-between w-[74vw] h-18 items-center ml-14 text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm">
        Ajouter un utilisateur
        <img className="w-5 h-4 mt-0 mr-3" src={pictoGroup} alt="" />
      </div>
      <div className=" flex justify-around mt-6 ">
        <input
          className="w-[24]  border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
          type="text"
          placeholder="Rechercher..."
        />
        <DropDownTeam />
      </div>
      <div className="">
        <div className="flex font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6">
          <img
            className="rounded-full w-16 mr-6 border-4 border-violet"
            src="./src/assets/avatar-user.jpeg"
            alt="User avatar"
          />
          <div>
            <p className="font-bold">Margaux Donova</p>
            <p className="italic">Chargée de communication</p>
          </div>
        </div>
        <div className="flex font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6">
          <img
            className="rounded-full w-16 mr-6 border-4 border-violet"
            src="./src/assets/my-avatar.jpeg"
            alt="User avatar"
          />
          <div>
            <p className="font-bold">Ryan Bidau</p>
            <p className="italic">Project manager</p>
          </div>
        </div>
        <div className="flex font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6">
          <img
            className="rounded-full w-16 mr-6 border-4 border-violet"
            src="./src/assets/user-avatar2.jpeg"
            alt="User avatar"
          />
          <div>
            <p className="font-bold">Michael Jackson</p>
            <p className="italic">Prévention - Affichage réglementaire</p>
          </div>
        </div>
      </div>
    </div>
  );
}