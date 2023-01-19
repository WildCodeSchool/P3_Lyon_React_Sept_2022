import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function ModifUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((response) => response.json())
      .then((user) => setUserData(user))
      .catch(console.error);
  }, []);

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // const onChangepass = (e) => {
  //   setUserData({
  //     ...userData,
  //     password: e.target.value,
  //   });
  // };

  const onChangeNum = (e) => {
    setUserData({
      ...userData,
      phone_number: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(userData);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
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
      fetch(`http://localhost:5000/api/users/${id}`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          navigate("/adminUser");
        })
        .catch(console.error);
  };

  return (
    <div className="fixed h-[100vh] top-0 left-0 bg-white w-[100%] z-10">
      <div className="font-[Enedis] pt-4 mt-1 text-primary text-center font-bold text-4xl mb-6">
        Modifier un utilisateur
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
          ;
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
            className="text-white h-15 ml-20 mt-10 font-[Enedis] bg-primary text-base w-[40vw] border border-primary rounded-2xl "
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
      <div className="flex mb-3  justify-center" />
    </div>
  );
}
