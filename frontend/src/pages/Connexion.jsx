import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import enedisLogo from "../assets/logo-enedis.png";
import "../App.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Connexion() {
  const { setUser, setToken } = useCurrentUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    if (email && password) {
      // on appelle le back
      fetch(`${backEnd}/api/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUser(result.user);
          setToken(result.token);
          navigate("/feed");
        })

        .catch((error) => console.error(error));
    } else {
      setErrorMessage("Please specify email and password");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" bg-white h-screen md:w-[50%]">
        <div className="mb-8 md:mb-4 flex justify-center">
          <img className="md:w-2/4 h-36" src={enedisLogo} alt="Logo" />
        </div>
        <div>
          <h1 className="text-3xl leading-[2.9rem] mt-[-10%] mb-4 text-primary font-bold text-center md:leading-10 md:mt-5 md:mb-5 ">
            Votre outil de communication Enedis
          </h1>
        </div>
        <div>
          <h3 className="text-2xl text-primary text-center md:text-2xl md:mt-0">
            Accédez à votre espace
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="">
            <p className="text-black font-bold text-lg mt-[80px]">
              Identifiant
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#1423DC] pl-4 h-12 w-[76vw] rounded mb-8 md:w-96"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              id="email"
              placeholder="name@enedis.fr"
            />
          </div>
          <div className="">
            <p className="text-black font-bold text-lg">Mot de passe</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#1423DC] pl-4 h-12 w-[76vw] rounded mb-8 md:w-96"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              id="password"
              placeholder="*************"
            />
          </div>
          <div className="text-center my-5">
            <button
              type="submit"
              className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] rounded-[20px] md:w-80  "
            >
              Se connecter
            </button>
          </div>
        </form>
        <div>{errorMessage}</div>
      </div>
      <div className=" md:bg-primary md:h-[100vh] md:w-[50%]" />
    </div>
  );
}

export default Connexion;
