import React from "react";
import { Link } from "react-router-dom";

function Post() {
  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 pt-6 px-6">
        <div className="flex flex-row self-start pb-4">
          <img
            className="rounded-full w-20 mr-6 border-4 border-violet"
            src="./src/assets/avatar-user.jpeg"
            alt="User avatar"
          />
          <div className="flex flex-col">
            <Link to="/profile">
              <h2 className="text-primary">Margaux Donova</h2>
            </Link>
            <h3 className="font-light text-primary">
              Communication Agence - Actualités
            </h3>
            <h3 className="text-gray-400 font-light">1h</h3>
          </div>
        </div>
        <img src="./src/assets/picture-post.jpg" alt="Post" />
        <h2 className="text-primary self-start my-2">
          Organisation repas de Noël !
        </h2>
        <p className="self-start text-sm">
          Cette année le repas de Noël aura lieu le 22 décembre...
          <span className="text-primary text-sm"> voir plus</span>
        </p>
        <div className="w-full mt-6 flex items-center justify-between pb-6">
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

      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 pt-6 px-6">
        <div className="flex flex-row self-start pb-4">
          <img
            className="rounded-full w-20 mr-6 border-4 border-green"
            src="./src/assets/user-avatar2.jpeg"
            alt="User avatar"
          />
          <div className="flex flex-col">
            <h2 className="text-primary">Michael Jackson</h2>
            <h3 className="font-light text-primary">
              Prévention - Affichage réglementaire
            </h3>
            <h3 className="text-gray-400 font-light">3j</h3>
          </div>
        </div>
        <h2 className="text-primary self-start my-2">
          Nouvelle réglementation
        </h2>
        <p className="self-start text-sm">
          Lorem ipsum dolor sit amet. Rem quisquam voluptatem eos enim dolor sed
          quos beatae. Est commodi pariatur id blanditiis aliquam qui similique
          omnis in voluptatem officiis nam iste sint.
        </p>
        <div className="w-full mt-6 flex items-center justify-between pb-6">
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
    </div>
  );
}

export default Post;
