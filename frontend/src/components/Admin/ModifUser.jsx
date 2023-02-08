import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import croix from "../../assets/croix.png";
import avatar from "../../assets/photo-avatar-profil.png";
import { useCurrentUserContext } from "../../contexts/userContext";
import "react-toastify/dist/ReactToastify.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function ModifUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { token } = useCurrentUserContext();

  useEffect(() => {
    fetch(`${backEnd}/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => setUserData(user))
      .catch((error) => console.error(error));
  }, []);

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNum = (e) => {
    setUserData({
      ...userData,
      phone_number: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const body = JSON.stringify(userData);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
      redirect: "follow",
    };
    if (
      userData.firstname &&
      userData.lastname &&
      userData.email &&
      userData.phone_number &&
      userData.role
    )
      fetch(`${backEnd}/api/users/${id}`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          navigate("/adminUser");
          toast.success("Utilisateur modifié !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch((error) => console.error(error));
  };

  return (
    userData.firstname && (
      <div className="h-screen">
        <Link to="/adminuser">
          <button type="button">
            <img className="mr-80 mt-3 ml-4" src={croix} alt="Close btn" />
          </button>
        </Link>
        <div className="md:flex md:items-center md:justify-center">
          <div className="font-[Enedis] text-primary text-center font-bold text-3xl md:text-4xl mb-6 md:w-48">
            Modifier un utilisateur
          </div>
          <div className="flex justify-around ">
            <img
              className="rounded-full h-40 w-40 ml-5 border-4 border-violet"
              src={
                userData.avatar
                  ? `${backEnd}/uploads/${userData.avatar}`
                  : avatar
              }
              alt="User avatar"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={onSubmit}
            className="flex text-base font-bold flex-col mt-1 text-black py-3"
          >
            Prénom :
            <input
              className=" border pl-2 my-3  h-12 rounded w-[80vw] border-primary"
              type="text"
              name="firstname"
              placeholder="Prénom"
              onChange={onChange}
              value={userData.firstname}
            />
            Nom :
            <input
              className=" border pl-2 h-12 my-3 rounded w-[80vw] border-primary"
              type="text"
              name="lastname"
              placeholder="Nom"
              onChange={onChange}
              value={userData.lastname}
            />
            Téléphone :
            <input
              className=" border pl-2 h-12 my-3 rounded w-[80vw] border-primary"
              type="text"
              name="phone"
              placeholder="Téléphone"
              onChange={onChangeNum}
              value={userData.phone_number}
            />
            Email :
            <input
              className=" border pl-2 h-12 my-3 rounded w-[80vw] border-primary"
              type="email"
              name="email"
              placeholder="email"
              onChange={onChange}
              value={userData.email}
            />
            {/* Mot de passe :
          <input
            className=" border pl-2 h-12 my-3 rounded w-[80vw] border-primary"
            type="password"
            name="pwd"
            placeholder="*********"
            onChange={onChangepass}
            value={userData.password}
          /> */}
            Poste :
            <input
              className=" border pl-2 h-12 my-3 rounded w-[80vw] border-primary"
              type="text"
              name="role"
              placeholder="Poste"
              onChange={onChange}
              value={userData.role}
            />
            <button
              type="submit"
              className="text-white h-15 w-44 p-2 mx-auto mt-4 font-[Enedis] bg-primary text-base border border-primary rounded-2xl "
            >
              Enregistrer
            </button>
          </form>
        </div>
        <div className="flex mb-3  justify-center" />
      </div>
    )
  );
}
