/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import croix from "../../../assets/croix.png";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function ModalCreatePost({ showCategories, setShowCategories }) {
  const { valueGroupe, valueCategory } = usePostUserContext();
  // ferme la modale des groupes avec la croix
  function closeModal() {
    setShowCategories(!showCategories);
  }

  // function pour récuperer la valeur inscrit dans le input et
  // la transférer à filterSearch
  const [filterSearch, setFilterSearch] = useState("");
  function handleSearch(e) {
    setFilterSearch(e.target.value);
  }

  // recupération de la valeur du groupe et de la catégorie sélectionné

  return (
    <div>
      <div className="fixed top-0 bg-white w-[101%] h-[100vh]">
        <button type="button" onClick={() => closeModal()}>
          <img className="ml-2 mt-6" src={croix} alt="" />
        </button>
        <h1 className="text-[32px] text-primary font-bold text-center ">
          Choisir un groupe et une catégorie
        </h1>
        <div className=" w-full">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cherchez un groupe..."
            className="border rounded-xl border-primary mx-auto w-[280px] h-11 my-10 ml-16 pl-4"
          />
        </div>
        <ul>
          {valueGroupe.map((group) => (
            <li key={group.id}>
              {group.group_name}
              <ul>
                {valueCategory.map((category) => (
                  <li onClick={() => console.warn(category)} key={category.id}>
                    {category.category_name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => console.log(valueGroupe)}>
          teste valueGroupe
        </button>
        <button type="button" onClick={() => console.log(valueCategory)}>
          teste valueCa
        </button>
      </div>
    </div>
  );
}

export default ModalCreatePost;
