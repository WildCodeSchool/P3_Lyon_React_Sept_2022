/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import groupe from "../../../assets/groupe.svg";

import file from "../../../assets/file.svg";

function SelectBar({ showCategories, setShowCategories }) {
  function handleCatergories() {
    setShowCategories(!showCategories);
  }

  return (
    <div className="flex justify-around text-center mt-2">
      <div onClick={() => handleCatergories()}>
        <button type="button">
          <img className="mx-auto" src={groupe} alt="" />
        </button>
        <h3 className="text-md font-light text-primary ">Groupe</h3>
      </div>

      <div>
        <button type="button">
          <img className="mx-auto" src={file} alt="" />
        </button>
        <h3 className="text-md font-light text-primary ">Fichier</h3>
      </div>
    </div>
  );
}

export default SelectBar;
