import React from "react";
import groupe from "../../../assets/groupe.svg";
import file from "../../../assets/file.svg";

function SelectBar({ showCategories, setShowCategories }) {
  function handleCatergories() {
    setShowCategories(!showCategories);
  }

  return (
    <div className="flex justify-around text-center mt-2">
      <button type="button" onClick={() => handleCatergories()}>
        <img className="mx-auto" src={groupe} alt="" />
      </button>
      <h3 className="text-md font-light text-primary ">Groupe</h3>
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
