import React, { useState } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";

function ProfileCard() {
  const [editProfile, setEditProfile] = useState(false);

  function openEditProfile() {
    setEditProfile(!editProfile);
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="user-avatar mx-auto rounded-full w-60 h-60 border-4 border-violet z-10">
        <Avatar />
      </div>
      <div className="square flex justify-center border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-80px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-24">Ryan Bidau</h2>
          <h3 className="text-xl italic">Project Manager</h3>
          <h3 className="text-lg mt-10 px-10">Equipe: Commercial</h3>
          <button
            onClick={() => openEditProfile()}
            className="border border-primary text-primary mt-2 py-2 px-[2.5rem] rounded-[20px]"
            type="button"
          >
            Edit Profile
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
