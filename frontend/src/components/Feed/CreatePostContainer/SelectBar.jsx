/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from "react";
import groupe from "../../../assets/groupe.svg";
import media from "../../../assets/media.svg";
import file from "../../../assets/file.svg";

function SelectBar({ showCategories, setShowCategories }) {
  function handleCatergories() {
    setShowCategories(!showCategories);
  }
  return (
    <div className="flex justify-around text-center mt-2">
      <div onClick={() => handleCatergories()}>
        <button>
          <img className="mx-auto" src={groupe} alt="" />
        </button>
        <h3 className="text-md font-light text-primary ">Groupe</h3>
      </div>
      <div>
        <button>
          <img className="mx-auto" src={media} alt="" />
        </button>
        <h3 className="text-md font-light text-primary">Image</h3>
      </div>
      <div>
        <button>
          <img className="mx-auto" src={file} alt="" />
        </button>
        <h3 className="text-md font-light text-primary ">Fichier</h3>
      </div>
    </div>
  );
}

export default SelectBar;
