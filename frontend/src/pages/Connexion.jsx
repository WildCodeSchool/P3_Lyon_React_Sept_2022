/* eslint-disable react/button-has-type */
import React from "react";
import { Link } from "react-router-dom";
import enedisLogo from "../assets/logo-enedis.png";
import "../App.css";
import line from "../assets/line.svg";

function Connexion() {
  return (
    <div className="h-[100vh] bg-white">
      <div className="mb-8">
        <img className="mx-auto" src={enedisLogo} alt="" />
      </div>
      <div className="mb-[80px]">
        <h1 className="text-[40px] leading-[2.9rem] text-[#1423DC] font-bold text-center ">
          Votre outil de <span>communication</span> Enedis !
        </h1>
      </div>
      <div>
        <h3 className=" absolute text-3xl text-[#1423DC] ml-[40px] my-[17px]  text-center">
          Accédez à votre espace
        </h3>
        <img src={line} className="absolute left-[7%] mx-auto" alt="" />
      </div>
      <div className="relative z-index:2 top-[13%] left-[2%] ">
        <div>
          <p className="text-black font-bold text-lg mt-[80px] ml-[50px]">
            Identifiant
          </p>
          <input
            className="border border-[#1423DC]  ml-[50px] h-12 w-[76vw] rounded mb-8"
            type="text"
            placeholder="name@enedis.fr"
          />
        </div>
        <div>
          <p className="text-black font-bold text-lg ml-[50px]">Mot de passe</p>
          <input
            className="border border-[#1423DC]  ml-[50px] h-12 w-[76vw] rounded mb-8"
            type="password"
            placeholder="*************"
          />
        </div>
        <div className="text-center my-5">
          <Link to="/feed">
            <button className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] rounded-[20px]">
              Se connecter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
