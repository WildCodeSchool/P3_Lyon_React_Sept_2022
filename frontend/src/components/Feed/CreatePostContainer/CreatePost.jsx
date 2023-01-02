/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import React from "react";
import croix from "../../../assets/croix.png";
import myAvatar from "../../../assets/my-avatar.jpeg";
import "../../../App.css";
import SelectBar from "./SelectBar";

function CreatePost() {
  return (
    <div>
      <div className="flex justify-between">
        <button>
          <img className="ml-2 mt-6" src={croix} alt="Close" />
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
        <p className="text-xl ml-[24px] text-primary font-bold ">Ryan Bidau</p>
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
      <SelectBar />
    </div>
  );
}

export default CreatePost;
