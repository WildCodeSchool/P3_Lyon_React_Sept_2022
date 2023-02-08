import React from "react";
import { Link } from "react-router-dom";
import energy from "../assets/save-energy.png";

function PageNotFound() {
  return (
    <div className="bg-[#111FBB] h-screen flex flex-col justify-center items-center px-10 md:px-16 xl:px-24">
      <h1 className="text-center text-5xl md:text-6xl xl:text-7xl text-white mb-10">
        Erreur 404
      </h1>
      <h2 className="text-center text-3xl md:text-4xl xl:text-5xl text-white">
        Cette page n'existe pas et pour vous aider, nous mettons toute notre
        <span className="text-green"> énergie</span>
      </h2>
      <img src={energy} alt="Energy" className="w-20 h-20 my-10" />
      <br />
      <Link to="/feed">
        <h3 className="text-center text-3xl text-white">
          Retour à la page d'accueil
        </h3>
      </Link>
    </div>
  );
}

export default PageNotFound;
