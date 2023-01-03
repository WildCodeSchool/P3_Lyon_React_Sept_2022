import React from "react";
import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className="h-screen w-screen	overflow-x-hidden bg-white">
      <button type="button">
        <img className="ml-2 mt-6" src="./src/assets/croix.png" alt="Close" />
      </button>
      <h1 className="text-[32px] text-primary font-bold text-center pb-8">
        Modifier mon profil
      </h1>
      <div className="flex justify-center">
        <img
          className="rounded-full w-36 border-4 border-violet mr-4"
          src="./src/assets/my-avatar.jpeg"
          alt="My profile avatar"
        />
        <div className="flex flex-col justify-evenly">
          <button
            type="button"
            className="bg-primary text-white py-3 px-[2.5rem] rounded-[20px]"
          >
            Changer
          </button>
          <button
            type="button"
            className="bg-white border border-primary text-primary py-3 px-[2.5rem] rounded-[20px]"
          >
            Supprimer
          </button>
        </div>
      </div>
      <form className="flex flex-col mt-10 justify-center items-center">
        <label className="flex flex-col text-xl mb-2">
          Prénom :
          <input
            className="w-80 rounded-md border border-primary py-2 pl-4 text-lg placeholder-black"
            type="text"
            placeholder="Ryan"
          />
        </label>
        <label className="flex flex-col text-xl mb-2">
          Nom :
          <input
            className="w-80 rounded-md border border-primary py-2 pl-4 text-lg placeholder-black"
            type="text"
            placeholder="Bidau"
          />
        </label>
        <label className="flex flex-col text-xl mb-2">
          Poste :
          <input
            className="w-80 rounded-md border border-primary py-2 pl-4 text-lg placeholder-black"
            type="text"
            placeholder="Project Manager"
          />
        </label>
      </form>
      <h2 className="text-lg text-center mt-2 font-light mb-4">
        Sélectionnez votre équipe
      </h2>
      <div className="flex justify-center items-center">
        <select
          id="equipe"
          className="w-80 bg-gray-50 border border-primary text-gray-900 text-md rounded-lg p-3"
        >
          <option selected>Equipe</option>
          <option value="Communication">Communication</option>
          <option value="Informatique">Informatique</option>
          <option value="RH">RH</option>
          <option value="Developpement">Développement</option>
          <option value="Technique">Technique</option>
          <option value="RC">Relation client</option>
        </select>
      </div>
      <div className="text-center mt-8">
        <button
          type="button"
          className="bg-primary text-white py-3 px-[2.5rem] rounded-[20px] w-6/12 text-md mb-4"
        >
          Enregistrer
        </button>
        <Link to="/">
          <h3 className="font-light">Se déconnecter</h3>
        </Link>
      </div>
    </div>
  );
}

export default EditProfile;
