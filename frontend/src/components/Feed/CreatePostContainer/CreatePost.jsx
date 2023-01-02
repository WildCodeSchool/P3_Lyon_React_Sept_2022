/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import croix from "../../../assets/croix.png";
import myAvatar from "../../../assets/my-avatar.jpeg";
import "../../../App.css";
import SelectBar from "./SelectBar";

function CreatePost() {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  const [showMenu4, setShowMenu4] = useState(false);
  const [showMenu5, setShowMenu5] = useState(false);
  const [categories, setCategories] = useState("Catégorie");
  const [groupe, setGroupe] = useState("Groupe");

  const [showCategories, setShowCategories] = useState(false);

  function handleCategorie(e) {
    setCategories(e);
  }
  function handleGroupe(e) {
    setGroupe(e);
  }
  function openAndChangeCategorie() {
    setShowMenu1(!showMenu1);
    handleCategorie("Communication Agence");
  }
  function handleCatergories() {
    setShowCategories(!showCategories);
  }

  return (
    <div>
      <div className="flex justify-between">
        <button>
          <a href="/feed">
            <img className="ml-2 mt-6" src={croix} alt="" />
          </a>
        </button>
        <button
          className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 mr-3
         rounded-[20px] justify-end"
        >
          Publier
        </button>
      </div>
      <div className="shadow-md my-[32px]">
        <h3 className="text-[32px] leading-[2.9rem] text-primary font-bold text-center pb-8 ">
          Créer votre publication
        </h3>
      </div>
      <div className="flex items-center">
        <img className="rounded-full w-28 ml-3" src={myAvatar} alt="" />
        <div className="block text-center">
          <p className="text-xl ml-[24px] text-primary font-bold ">
            Ryan Bidau
          </p>
          <p className="text-xl ml-[24px] text-primary">{categories}</p>
          <p className="text-xl ml-[24px] text-primary">{groupe}</p>
        </div>
      </div>

      <div>
        <input
          className="mt-8 h-[5em] w-full pl-8"
          type="text"
          placeholder="Titre...*"
        />
        <hr className="h-[2px] bg-grey" />
        <input
          className="h-[20em] w-full pl-8"
          type="text"
          placeholder="Votre publication...*"
        />
      </div>
      <hr className="h-[2px] bg-grey" />
      <SelectBar
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      {showCategories ? (
        <div className="absolute top-0 bg-white w-[100%] h-[100vh]">
          <button>
            <img
              className="ml-2 mt-6"
              src={croix}
              onClick={() => handleCatergories()}
              alt=""
            />
          </button>
          <p className="text-[35px] text-primary text-center ">
            Choisir un groupe et une catégorie
          </p>
          <div className=" w-full">
            <input
              className=" border-2 rounded border-primary mx-auto w-64 h-9"
              type="search"
              placeholder="Cherchez un groupe..."
            />
          </div>

          <div className=" w-full">
            <div className="dropdown inline-block relative w-full">
              <div className="flex justify-between">
                <button
                  onClick={() => openAndChangeCategorie()}
                  className="bg-primary text-white text-2xl font-['Enedis'] font-bold h-10 w-full"
                >
                  Communication Agence
                </button>
              </div>
              {showMenu1 ? (
                <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
                  <li
                    onClick={() => handleGroupe("Actualités")}
                    className="cursor-pointer h-10 hover:bg-primary"
                  >
                    Actualités
                  </li>
                  <li
                    onClick={() => handleGroupe("La vie des sites")}
                    className="cursor-pointer h-10  hover:bg-primary"
                  >
                    La vie des sites
                  </li>
                  <li
                    onClick={() => handleGroupe("Affichage réglementaire")}
                    className="cursor-pointer h-10  hover:bg-primary"
                  >
                    Affichage réglementaire
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" w-full">
            <div className="dropdown inline-block relative w-full">
              <div className="flex justify-between">
                <button
                  onClick={() => setShowMenu2(!showMenu2)}
                  className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
                >
                  Métier
                </button>
              </div>
              {showMenu2 ? (
                <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
                  <li
                    onClick={() => handleGroupe("Nice")}
                    className="cursor-pointer h-10  hover:bg-primary"
                  >
                    One
                  </li>
                  <li
                    onClick={() => handleGroupe("Nice")}
                    className="cursor-pointer h-10  hover:bg-primary"
                  >
                    Two
                  </li>
                  <li
                    onClick={() => handleGroupe("Nice")}
                    className="cursor-pointer h-10  hover:bg-primary"
                  >
                    Three is the magic number
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" w-full">
            <div className="dropdown inline-block relative w-full">
              <div className="flex justify-between">
                <button
                  onClick={() => setShowMenu3(!showMenu3)}
                  className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
                >
                  Prévention
                </button>
              </div>
              {showMenu3 ? (
                <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
                  <li className="cursor-pointer h-10  hover:bg-primary">One</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">Two</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">
                    Three is the magic number
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" w-full">
            <div className="dropdown inline-block relative w-full">
              <div className="flex justify-between">
                <button
                  onClick={() => setShowMenu4(!showMenu4)}
                  className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
                >
                  Clients
                </button>
              </div>
              {showMenu4 ? (
                <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
                  <li className="cursor-pointer h-10  hover:bg-primary">One</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">Two</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">
                    Three is the magic number
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" w-full">
            <div className="dropdown inline-block relative w-full">
              <div className="flex justify-between">
                <button
                  onClick={() => setShowMenu5(!showMenu5)}
                  className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
                >
                  Entre Nous
                </button>
              </div>
              {showMenu5 ? (
                <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
                  <li className="cursor-pointer h-10  hover:bg-primary">One</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">Two</li>
                  <li className="cursor-pointer h-10  hover:bg-primary">
                    Three is the magic number
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreatePost;
