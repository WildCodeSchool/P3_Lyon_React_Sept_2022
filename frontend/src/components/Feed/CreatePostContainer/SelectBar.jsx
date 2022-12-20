import React from "react";
import groupe from "../../../assets/groupe.svg";
import media from "../../../assets/media.svg";
import file from "../../../assets/file.svg";

function SelectBar() {
  return (
    <div className="flex justify-around mt-2">
      <div>
        <img className="mx-auto" src={groupe} alt="" />
        <p className="text-xl text-primary ">Groupe</p>
      </div>
      <div>
        <img className="mx-auto" src={media} alt="" />
        <p className="text-xl text-primary">Image</p>
      </div>
      <div>
        <img className="mx-auto" src={file} alt="" />
        <p className="text-xl text-primary ">Fichier</p>
      </div>
    </div>
  );
}

export default SelectBar;
