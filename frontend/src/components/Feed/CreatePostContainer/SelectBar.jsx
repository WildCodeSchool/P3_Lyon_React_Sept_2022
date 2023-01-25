import React from "react";
import groupe from "../../../assets/groupe.svg";

function SelectBar({ showCategories, setShowCategories }) {
  function handleCatergories() {
    setShowCategories(!showCategories);
  }

  return (
    <div>
      <button
        className="flex flex-col items-center justify-center cursor-pointer pl-7"
        type="button"
        onClick={() => handleCatergories()}
      >
        <img className="w-7 h-7" src={groupe} alt="Group" />
        <h3 className="text-md font-light text-primary">Groupe</h3>
      </button>
    </div>
  );
}

export default SelectBar;
