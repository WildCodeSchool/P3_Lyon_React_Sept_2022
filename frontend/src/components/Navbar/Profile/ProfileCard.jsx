import React, { useState } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";

function ProfileCard() {
  const [editProfile, setEditProfile] = useState(false);

  function openEditProfile() {
    setEditProfile(!editProfile);
  }

  return (
    <div className="flex flex-col justify-center w-screen">
      <div className="user-avatar mx-auto rounded-full w-60 h-60 border-4 border-violet z-10">
        <Avatar />
      </div>
      <div className="square flex justify-center shadow-[3px_3px_4px_#C9CBF0] border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-60px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-20">Ryan Bidau</h2>
          <h3 className="text-xl italic">Project Manager</h3>
          <h3 className="text-lg mt-6 px-10">Equipe: Commercial</h3>
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
