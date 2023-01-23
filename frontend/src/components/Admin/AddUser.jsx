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
          toast(" ✅ User created !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        })
        .catch(console.error);
    } else {
      toast(" ❌ Please specify email and password  !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
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
            className="text-white mr-4 my-4 font-[Enedis] bg-primary text-l w-[40vw] font-bold border h-10 border-primary rounded-3xl "
          >
            Modifier
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
            type="text"
            name="firstname"
            placeholder="Prénom"
            onChange={onChange}
            value={credentials.firstname}
          />
          Nom :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="text"
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
            placeholder="Téléphone"
            onChange={onChangeNum}
            value={credentials.phone_number}
          />
          Email :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="email"
            name="email"
            placeholder="email"
            onChange={onChange}
            value={credentials.email}
          />
          Mot de passe :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="password"
            name="pwd"
            placeholder="*********"
            onChange={onChangepass}
            value={credentials.password}
          />
          Poste :
          <input
            className=" border pl-2 h-8 my-3 rounded w-[80vw] border-primary"
            type="text"
            name="role"
            placeholder="Poste"
            onChange={onChange}
            value={credentials.role}
          />
          <button
            type="submit"
            className="text-white ml-20 mb-1S font-[Enedis] bg-primary text-base w-[40vw] border h-10 border-primary rounded-2xl "
          >
            Enregistrer
          </button>
        </form>
      </div>
      <div className="flex mb-3  justify-center" />
    </div>
  );
}
