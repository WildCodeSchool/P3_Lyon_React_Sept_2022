import React from "react";

function PostDetails() {
  return (
    <div className="h-screen bg-white">
      <button type="button">
        <img className="ml-4 mt-6" src="./src/assets/croix.png" alt="Close" />
      </button>
      <div className="flex flex-row items-center py-6 px-10">
        <img
          className="rounded-full w-24 mr-6 border-4 border-violet"
          src="./src/assets/avatar-user.jpeg"
          alt="User avatar"
        />
        <h2 className="text-primary text-3xl text-left">
          Com interne : organisation repas de Noël
        </h2>
      </div>
      <div className="flex justify-evenly px-4">
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px]">
          Communication agence
        </div>
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px]">
          Actualités
        </div>
      </div>
      <img className="mt-10" src="./src/assets/picture-post.jpg" alt="Post" />
      <p className="bg-white text-md p-8">
        Cette année le repas de Noël aura lieu le 22 décembre. Le mois de
        décembre, nous l'attendons tous avec impatience ! En cette année bien
        chargée et particulière nous pensons à vous et à vos enfants, afin que
        vous puissiez continuer à partager des moments unique pour les fêtes de
        fin d'année. Des animations de Noël en Ardèche Hermitage se préparent
        pour votre plus grand plaisir !
      </p>
      <div className="w-full mt-6 flex items-center justify-between px-6">
        <div className="flex flex-col items-center justify-center">
          <img
            className="rounded-full w-10 mr-2 border-4 border-green"
            src="./src/assets/user-avatar2.jpeg"
            alt="My profile avatar"
          />
          <h3 className="font-light text-[9px]">Michael</h3>
        </div>
        <input
          className="w-5/6 shadow-md rounded-xl py-2 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
          type="text"
          value="Super idée ! On fait Secret Santa ?"
        />
      </div>
      <div className="w-full mt-6 flex items-center justify-between px-6 pb-6">
        <img
          className="rounded-full w-10 mr-2 border-4 border-violet"
          src="./src/assets/my-avatar.jpeg"
          alt="My profile avatar"
        />
        <input
          className="w-5/6 shadow-md rounded-xl py-2 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
          type="text"
          placeholder="Laissez un commentaire..."
        />
      </div>
    </div>
  );
}

export default PostDetails;
