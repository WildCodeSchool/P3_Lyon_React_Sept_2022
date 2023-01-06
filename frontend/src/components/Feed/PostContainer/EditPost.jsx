import React, { useState } from "react";
import SelectBar from "../CreatePostContainer/SelectBar";

// eslint-disable-next-line react/prop-types
function EditPost({ handleEditPostModal }) {
  const [editTitle, setTitle] = useState("Solar énergies renouvelables");
  const [editText, setText] = useState(
    "In publishing and graphic design, Lorem ipsum is In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form."
  );
  return (
    <div className="fixed top-0 left-0 bg-white h-screen w-screen overflow-y-scroll z-10">
      <div className="flex justify-between">
        <button onClick={() => handleEditPostModal()} type="button">
          <img className="ml-2 mt-6" src="./src/assets/croix.png" alt="Close" />
        </button>
        <button
          type="button"
          className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 mr-3
         rounded-[20px] justify-end"
        >
          Enregistrer
        </button>
      </div>
      <div className="shadow-md my-[32px]">
        <h1 className="text-[32px] leading-[2.9rem] text-primary font-bold text-center pb-8 ">
          Modifier votre publication{" "}
        </h1>
      </div>
      <div className="flex items-center">
        <img
          className="rounded-full w-28 ml-3"
          src="./src/assets/my-avatar.jpeg"
          alt="Avatar"
        />
        <div className="block text-left">
          <h2 className="text-xl ml-[24px] text-primary font-bold ">
            Ryan Bidau
          </h2>
          <p className="text-md ml-[24px] text-primary">Communication agence</p>
          <p className="text-md ml-[24px] text-primary">Actualités</p>
        </div>
      </div>

      <div>
        <textarea
          className="text-black font-bold self-start mt-5 px-6 w-screen"
          type="text"
          value={editTitle}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          className="px-6 w-screen h-28"
          type="text"
          value={editText}
          onChange={(event) => setText(event.target.value)}
        />
        <img src="./src/assets/solar-groups.jpeg" alt="Post" />
      </div>
      <SelectBar />
    </div>
  );
}

export default EditPost;
