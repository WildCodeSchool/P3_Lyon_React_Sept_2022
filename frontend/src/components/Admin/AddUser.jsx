import React, { useState } from "react";
import { toast } from "react-toastify";
import croix from "../../assets/croix.png";
import "react-toastify/dist/ReactToastify.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function AddUser({ openAndCloseUserModal }) {
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onChangepass = (e) => {
    setCredentials({
      ...credentials,
      password: e.target.value,
    });
  };

  const onChangeNum = (e) => {
    setCredentials({
      ...credentials,
      phone_number: e.target.value,
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
      redirect: "follow",
    };

    if (
      credentials.firstname &&
      credentials.lastname &&
      credentials.email &&
      credentials.phone_number &&
      credentials.password &&
      credentials.role
    ) {
      fetch(`${backEnd}/api/register`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          openAndCloseUserModal();
          toast.success(" Utilisateur créé !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch(console.error);
    } else {
      toast.error(" Veuillez compléter toutes les informations  !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="fixed h-[100vh] top-0 left-0 bg-white w-[100%] z-10 md:overflow-y-scroll">
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
          className="rounded-full w-40 ml-5 border-4 border-violet"
          src="./src/assets/photo-avatar-profil.png"
          alt="User avatar"
        />
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={onSubmit}
          className="flex text-base font-bold flex-col mt-1 text-black py-3"
        >
          Prénom :
          <input
            className=" border pl-2 my-3 h-8 rounded w-[80vw] border-primary"
            type="text"
            required
            name="firstname"
            placeholder="Prénom"
            onChange={onChange}
            value={credentials.firstname}
          />
          Nom :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="text"
            required
            name="lastname"
            placeholder="Nom"
            onChange={onChange}
            value={credentials.lastname}
          />
          Téléphone :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="text"
            name="phone"
            required
            placeholder="Téléphone"
            onChange={onChangeNum}
            value={credentials.phone_number}
          />
          Email :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="email"
            name="email"
            required
            placeholder="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={onChange}
            value={credentials.email}
          />
          Mot de passe :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="password"
            name="pwd"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            placeholder="*********"
            onChange={onChangepass}
            value={credentials.password}
          />
          Poste :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="text"
            name="role"
            required
            placeholder="Poste"
            onChange={onChange}
            value={credentials.role}
          />
          <button
            type="submit"
            className="text-white mx-auto my-2 font-[Enedis] bg-primary text-base w-44 border h-10 border-primary rounded-2xl "
          >
            Enregistrer
          </button>
        </form>
      </div>
      <div className="flex mb-3  justify-center" />
    </div>
  );
}
