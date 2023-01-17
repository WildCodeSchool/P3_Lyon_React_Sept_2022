/* eslint-disable react/prop-types */
import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useCurrentUserContext } from "../../../contexts/userContext";

function ProfileCard() {
  const { user } = useCurrentUserContext();
  const [editProfile, setEditProfile] = useState(false);

  const openEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className="flex flex-col justify-center w-screen">
      <div className="user-avatar mx-auto rounded-full z-10">
        <img
          src={user.avatar}
          alt="My profile avatar"
          className="rounded-full w-60 h-60 border-4 border-violet "
        />
      </div>
      <div className="square flex justify-center shadow-[3px_3px_4px_#C9CBF0] border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-60px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-20">
            {user.firstname} {user.lastname}
          </h2>
          <h3 className="text-xl italic">{user.role}</h3>
          <h3 className=" text-sm mt-6 px-10">Email : {user.email}</h3>
          <h4 className=" text-sm mt-6 px-10"> {user.phone_number}</h4>
          <button
            onClick={() => openEditProfile()}
            className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-[2.5rem] rounded-[20px]"
            type="button"
          >
            Modifier
          </button>
          {editProfile ? (
            <EditProfile
              editProfile={editProfile}
              setEditProfile={setEditProfile}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
