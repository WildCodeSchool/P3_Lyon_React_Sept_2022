import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";

function Profile() {
  const [editPost, setEditPost] = useState(false);
  const handleEditPost = () => {
    setEditPost(!editPost);
  };

  return (
    <div className="w-screen">
      <Navbar />
      <ProfileCard />
      <h1 className="text-primary text-center text-4xl mb-3">Publications</h1>
      <div>
        <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-10 pt-10 px-6">
          <button
            onClick={() => handleEditPost()}
            className="absolute right-0 bottom-28"
            type="button"
          >
            <img className="h-8" src="./src/assets/menu-dots.png" alt="Menu" />
          </button>
          {editPost ? (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button className="text-black p-4" type="button">
                <span>Modifier</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row self-start pb-4">
            <img
              className="rounded-full w-20 mr-6 border-4 border-violet"
              src="./src/assets/my-avatar.jpeg"
              alt="User avatar"
            />
            <div className="flex flex-col">
              <Link to="/profile">
                <h2 className="text-primary">Ryan Bidau</h2>
              </Link>
              <h3 className="font-light text-primary">
                Communication Agence - Actualités
              </h3>
              <h3 className="text-gray-400 font-light">1h</h3>
            </div>
          </div>
          <img src="./src/assets/solar-groups.jpeg" alt="Post" />
          <h2 className="text-primary self-start my-2">
            Solar énergies renouvelables
          </h2>
          <p className="self-start text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus,
            natus?...
            <span className="text-primary text-sm"> voir plus</span>
          </p>
          <div className="w-full mt-6 flex items-center justify-between pb-6">
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
    </div>
  );
}

export default Profile;
