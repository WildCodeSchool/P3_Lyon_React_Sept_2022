/* eslint-disable react/prop-types */
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
import FlecheDownGrey from "../../../assets/Vector-down-grey.png";

function CreatePost({ showCreatePost, setShowCreatePost }) {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  const [showMenu4, setShowMenu4] = useState(false);
  const [showMenu5, setShowMenu5] = useState(false);
  const [categories, setCategories] = useState("");
  const [groupe, setGroupe] = useState("");

  const [showCategories, setShowCategories] = useState(false);

  /* Remove la modal CreatePost  */
  function removeModalCreatePost() {
    setShowCreatePost(!showCreatePost);
  }

  /* Garde la valeur du li(Catégorie) selectionné  */

  function handleCategorie(e) {
    setCategories(e);
  }

  /* Garde la valeur du li(groupe) selectionné et referme la modale(fullScreen)  */

  function handleGroupe(e) {
    setGroupe(e);
    setShowCategories(!showCategories);
  }

  /* ouvre menu déroulant numéro 1 et prend la valeur du titre */

  function openAndChangeCategorie1() {
    setShowMenu1(!showMenu1);
    handleCategorie("Communication Agence");
  }

  /* ouvre menu déroulant numéro 2 et prend la valeur du titre */

  function openAndChangeCategorie2() {
    setShowMenu2(!showMenu2);
    handleCategorie("Métier");
  }

  /* ouvre menu déroulant numéro 3 et prend la valeur du titre */

  function openAndChangeCategorie3() {
    setShowMenu3(!showMenu3);
    handleCategorie("Prévention");
  }
  /* ouvre menu déroulant numéro 4 et prend la valeur du titre */

  function openAndChangeCategorie4() {
    setShowMenu4(!showMenu4);
    handleCategorie("Clients");
  }
  /* ouvre menu déroulant numéro 5 et prend la valeur du titre */

  function openAndChangeCategorie5() {
    setShowMenu5(!showMenu5);
    handleCategorie("Entre Nous");
  }
  /* change la valeur du state showCategorie et fait apparaître la modal des catégories */

  function handleCatergories() {
    setShowCategories(!showCategories);
  }

  return (
    <div className="fixed top-0 left-0 bg-white w-[100%] h-[100vh] z-10">
      <div className="bg-white">
        <div className="flex justify-between">
          <button onClick={() => removeModalCreatePost()}>
            <img className="ml-2 mt-6" src={croix} alt="" />
          </button>
          <button
            className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 mr-3
         rounded-[20px] justify-end"
          >
            Publier
          </button>
        </div>
        <div className="shadow-md my-[32px]">
          <h1 className="text-[32px] leading-[2.9rem] text-primary font-bold text-center pb-8 ">
            Créer une publication
          </h1>
        </div>
        <div className="flex items-center">
          <img className="rounded-full w-28 ml-3" src={myAvatar} alt="" />
          <div className="block text-left">
            <h2 className="text-xl ml-[24px] text-primary font-bold ">
              Ryan Bidau
            </h2>
            <p className="text-md ml-[24px] text-primary">{categories}</p>
            <p className="text-md ml-[24px] text-primary">{groupe}</p>
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
          <div className="fixed top-0 bg-white w-[100%] h-[100vh]">
            <button>
              <img
                className="ml-2 mt-6"
                src={croix}
                onClick={() => handleCatergories()}
                alt=""
              />
            </button>
            <h1 className="text-[32px] text-primary font-bold text-center ">
              Choisir un groupe et une catégorie
            </h1>
            <div className=" w-full">
              <input
                className=" border rounded-xl border-primary mx-auto w-[280px] h-9 my-10 ml-16 pl-4"
                type="search"
                placeholder="Cherchez un groupe..."
              />
            </div>

            <div className="w-full mt-4">
              <div className="dropdown inline-block relative w-full">
                <div className="flex justify-between">
                  <button
                    onClick={() => openAndChangeCategorie1()}
                    className="text-black text-2xl border border-gray-200 active:bg-primary active:text-white focus:bg-primary focus:text-white h-14 w-full"
                  >
                    <div className="flex justify-between h-12 items-center">
                      <h2 className="mx-auto font-normal pt-2">
                        Communication Agence
                      </h2>
                      <img
                        className="w-5 h-5 mr-3 mt-1.5"
                        src={FlecheDownGrey}
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {showMenu1 ? (
                  <ul className="dropdown-menu text-lg px-10 font-normal text-gray-700 pt-5 shadow-md">
                    <li
                      onClick={() => handleGroupe("Actualités")}
                      className="cursor-pointer h-10 hover:bg-violet"
                    >
                      Actualités
                    </li>
                    <li
                      onClick={() => handleGroupe("La vie des sites")}
                      className="cursor-pointer h-10  hover:bg-violet"
                    >
                      La vie des sites
                    </li>
                    <li
                      onClick={() => handleGroupe("Affichage réglementaire")}
                      className="cursor-pointer h-10  hover:bg-violet"
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
                    onClick={() => openAndChangeCategorie2()}
                    className=" text-black text-2xl font-['Enedis'] active:bg-primary active:text-white focus:bg-primary focus:text-white font-semibold h-14 rounded w-full"
                  >
                    <div className="flex justify-between h-12 items-center">
                      <h2 className="mx-auto font-normal">Métier</h2>
                      <img
                        className="w-5 h-5 mr-3 mt-1.5"
                        src={FlecheDownGrey}
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {showMenu2 ? (
                  <ul className="dropdown-menu text-lg px-10 font-normal text-gray-700 pt-5 shadow-md">
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      One
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      Two
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
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
                    onClick={() => openAndChangeCategorie3()}
                    className=" text-black text-2xl font-['Enedis'] border border-gray-200 active:bg-primary active:text-white focus:bg-primary focus:text-white font-semibold h-14 rounded w-full"
                  >
                    <div className="flex justify-between h-12 items-center">
                      <h2 className="mx-auto font-normal">Prévention</h2>
                      <img
                        className="w-5 h-5 mr-3 mt-1.5"
                        src={FlecheDownGrey}
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {showMenu3 ? (
                  <ul className="dropdown-menu text-lg px-10 font-normal text-gray-700 pt-5 shadow-md">
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      One
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      Two
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
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
                <div className="flex justify-between h-12">
                  <button
                    onClick={() => openAndChangeCategorie4()}
                    className=" text-black text-2xl font-['Enedis'] border-b border-gray-200 active:bg-primary active:text-white focus:bg-primary focus:text-white font-semibold h-14 rounded w-full"
                  >
                    <div className="flex justify-between h-12 items-center">
                      <h2 className="mx-auto font-normal">Clients</h2>
                      <img
                        className="w-5 h-5 mr-3 mt-1.5"
                        src={FlecheDownGrey}
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {showMenu4 ? (
                  <ul className="dropdown-menu text-lg px-10 font-normal text-gray-700 pt-5 shadow-md">
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      One
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      Two
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
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
                    onClick={() => openAndChangeCategorie5()}
                    className=" text-black text-2xl font-['Enedis'] font-semibold h-14 rounded w-full"
                  >
                    <div className="flex justify-between h-12 items-center">
                      <h2 className="mx-auto font-normal">Entre Nous</h2>
                      <img
                        className="w-5 h-5 mr-3 mt-1.5"
                        src={FlecheDownGrey}
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {showMenu5 ? (
                  <ul className="dropdown-menu text-lg px-10 font-normal text-gray-700 pt-5 shadow-md">
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      One
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
                      className="cursor-pointer h-10  hover:bg-primary"
                    >
                      Two
                    </li>
                    <li
                      onClick={() => handleGroupe("à définir")}
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
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CreatePost;
