/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import React from "react";
import enedisLogo from "../assets/logo-enedis.png";
import "../App.css";

function Connexion() {
  return (
    <div className="h-[100vh] bg-white">
      <div className="mb-8">
        <img className="mx-auto" src={enedisLogo} alt="" />
      </div>
      <div className="mb-[80px]">
        <h1 className="text-[40px] leading-[2.9rem] text-primary font-bold text-center ">
          Votre outil de communication Enedis !
        </h1>
      </div>
      <div>
        <h3 className=" absolute text-3xl text-primary ml-[40px] my-[17px]  text-center">
          Accédez à votre espace
        </h3>
        <div className="bg-[url('../src/assets/line.svg')] bg-no-repeat  h-[356px] ml-[23px]"></div>
        ;
      </div>
      <div className="mt-[-22em]">
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
          <button className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] rounded-[20px]">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
