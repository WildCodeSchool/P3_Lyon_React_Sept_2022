import React, { useState } from "react";
import EditProfile from "./EditProfile";

function ProfileCard({ profileUser }) {
  const [editProfile, setEditProfile] = useState(false);

  const openEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className="flex flex-col justify-center w-screen">
      <div className="user-avatar mx-auto rounded-full z-10 md:mt-1">
        <img
          src={profileUser.avatar}
          alt="My profile avatar"
          className="rounded-full w-60 h-60 border-4 border-violet "
        />
      </div>
      <div className="square flex justify-center shadow-[3px_3px_4px_#C9CBF0] border border-primary rounded-lg w-80 h-80 mx-auto relative top-[-60px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-20">
            {profileUser.firstname} {profileUser.lastname}
          </h2>
          <h3 className="text-xl italic">{profileUser.role}</h3>
          <h3 className=" text-sm mt-6 px-10">Email : {profileUser.email}</h3>
          <h4 className=" text-sm mt-6 px-10"> {profileUser.phone_number}</h4>
          <button
            onClick={() => openEditProfile()}
            className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-[2.5rem] rounded-[20px]"
            type="button"
          >
            Modifier
          </button>
          {editProfile ? (
            <EditProfile
              profileUser={profileUser}
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
