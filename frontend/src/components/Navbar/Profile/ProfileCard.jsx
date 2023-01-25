import React from "react";

function ProfileCard({ profileUser }) {
  return (
    <div className="flex flex-col justify-center w-screen pt-5">
      <div className="user-avatar mx-auto rounded-full z-10 md:mt-1">
        <img
          src={profileUser.avatar}
          alt="My profile avatar"
          className="rounded-full w-60 h-60 border-4 border-violet "
        />
      </div>
      <div className="flex justify-center shadow-[3px_3px_4px_#C9CBF0] border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-60px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-20">
            {profileUser.firstname} {profileUser.lastname}
          </h2>
          <h3 className="text-xl italic">{profileUser.role}</h3>
          <h3 className=" text-md mt-6">Email : {profileUser.email}</h3>
          <h4 className=" text-md mt-6">
            Téléphone : {profileUser.phone_number}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
