import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";
import EditPost from "../components/Feed/PostContainer/EditPost";

function Profile() {
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal);
  };

  return (
    <div className="bg-[#f6f6fe] w-screen">
      <Navbar />
      <ProfileCard />
      <h1 className="text-primary text-center text-4xl mb-3">Publications</h1>
      <div>
        <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-6">
          <div className="flex justify-end pt-2">
            <button onClick={() => handleEditPost()} type="button">
              <img
                className="h-8"
                src="./src/assets/menu-dots.png"
                alt="Menu"
              />
            </button>
          </div>
          {editPostMenu ? (
            <div className="origin-top-right absolute right-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button
                onClick={() => handleEditPostModal()}
                className="text-black p-4 flex"
                type="button"
              >
                <img
                  className="h-5 w-5"
                  src="./src/assets/edit.png"
                  alt="Edit"
                />
                <span className="pl-3">Modifier</span>
              </button>
              {editPostModal ? (
                <EditPost
                  editPostModal={editPostModal}
                  setEditPostModal={setEditPostModal}
                  handleEditPostModal={handleEditPostModal}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row self-start pb-4 px-6">
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
          <div className="px-6">
            <h2 className="text-black self-start my-2">
              Solar énergies renouvelables
            </h2>
            <p className="self-start text-sm">
              Le salon énergies renouvelables à Barcelone a eu lieu le 20
              décembre...
              <span className="text-primary text-base"> voir plus</span>
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
      </div>
    </div>
  );
}

export default Profile;
