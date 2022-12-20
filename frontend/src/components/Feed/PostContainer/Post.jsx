import React from "react";

function Post() {
  return (
    <div>
      <div className="w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 flex flex-col items-center jusitfy-between pt-6 px-6">
        <div className="flex flex-row self-start pb-4">
          <img
            className="rounded-full w-16 mr-2 border-4 border-violet"
            src="./src/assets/avatar-user.jpeg"
            alt="User avatar"
          />
          <div className="flex flex-col">
            <h2 className="text-primary">Margaux Donova</h2>
            <h3 className="font-light text-primary">
              Communication Agence - Actualités
            </h3>
          </div>
        </div>
        <img src="./src/assets/picture-post.jpg" alt="Post" />
        <h2 className="text-primary self-start my-2">
          Organisation repas de Noël !
        </h2>
        <p className="self-start text-sm">
          Cette année le repas de Noël aura lieu le 22 décembre...
          <span className="text-primary text-sm">voir plus</span>
        </p>
        <div className="w-full mt-6 flex items-center justify-between">
          <img
            className="rounded-full w-10 mr-2 border-4 border-violet"
            src="./src/assets/my-avatar.jpeg"
            alt="My profile avatar"
          />
          <div className="w-5/6 shadow-md rounded-xl h-10 pt-2">
            <span className="ml-2 text-gray-400">
              Laissez un commentaire...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
