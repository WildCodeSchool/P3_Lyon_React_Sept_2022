import React from "react";
import Avatar from "../Avatar";

function ProfileCard() {
  return (
    <div className="flex flex-col justify-center">
      <div className="user-avatar mx-auto rounded-full w-60 h-60 border-4 border-violet z-10">
        <Avatar />
      </div>
      <div className="square flex justify-center border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-80px]">
        <div className="profile-details text-primary text-center">
          <h2 className="text-2xl font-black mt-24">Margaux Donova</h2>
          <h3 className="text-xl italic">Chargée de Communication</h3>
          <h3 className="text-lg mt-10 px-10">
            Equipe: Communication / Marketing
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
