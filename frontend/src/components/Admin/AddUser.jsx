import React, { useState } from "react";
import croix from "../../assets/croix.png";

// eslint-disable-next-line react/prop-types
export default function AddUser({ openAndCloseUserModal }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    user_password: "",
    avatar: "",
  });

  const onChange = (e) => {
    // Je reprends le "credentials" soit l'ancien état du state et je vais lui demander de fusionner [e.target.name] qui va désormais contenir e.target.value.
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(credentials);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    // Je vérifie que les champs ci-dessous contiennent au moins un caractère afin de passer au fetch
    if (
      credentials.firstname &&
      credentials.lastname &&
      credentials.email &&
      credentials.phone_number &&
      credentials.user_password &&
      credentials.avatar
    ) {
      fetch("http://localhost:5000/api/register", requestOptions)
        .then((response) => response.text())
        .then(() => {
          openAndCloseUserModal();
        })
        .catch(console.error);
    } else {
      setErrorMessage("Please specify email and password");
    }
  };
  return (
    <div className="fixed h-[100vh] top-0 left-0 bg-white w-[100%] z-10">
      <div>
        <button type="button" onClick={openAndCloseUserModal}>
          <img className="mr-80 mt-3 ml-4" src={croix} alt="Close btn" />
        </button>
      </div>
      <div className="font-[Enedis] mt-1 text-primary text-center font-bold text-4xl mb-6">
        Ajouter un utilisateur
      </div>
      <div className="flex justify-around ">
        <img
          className="rounded-full w-[42vw] ml-5 border-4 border-violet"
          src="./src/assets/user-avatar2.jpeg"
          alt="User avatar"
        />
        <div className="ml-5 mt-4">
          <button
            type="button"
            className="text-white my-4 font-[Enedis] bg-primary text-l w-[40vw] font-bold border h-10 border-primary rounded-3xl "
          >
            Changer
          </button>
          <button
            type="button"
            className="text-primary font-[Enedis] bg-white text-l w-[40vw] font-bold border h-10 border-primary rounded-3xl "
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={onSubmit}
          className="flex text-base font-bold flex-col mt-1 text-black py-3"
        >
          Prénom :
          <input
            className=" border pl-2 my-3  h-8 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
          />
          Nom :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
            onChange={onChange}
            value={credentials.firstname}
          />
          Téléphone :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
            onChange={onChange}
            value={credentials.lastname}
          />
          Email :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
            onChange={onChange}
            value={credentials.email}
          />
          Mot de passe :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
            onChange={onChange}
            value={credentials.user_password}
          />
          Poste :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            id="firstname"
            type="text"
            onChange={onChange}
            value={credentials.poste}
          />
        </form>
        <div>{errorMessage}</div>
      </div>
      <div className="flex mb-3  justify-center">
        <button
          type="submit"
          className="text-white mb-3 font-[Enedis] bg-primary text-base w-[40vw] border h-10 border-primary rounded-2xl "
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
