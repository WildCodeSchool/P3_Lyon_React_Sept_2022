import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUserContext } from "../../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function ProfileCard({ profileUser, setProfileUser }) {
  const [avatar, setAvatar] = useState(profileUser.avatar);
  const inputRef = useRef(null);
  const { token } = useCurrentUserContext();

  const { user, setUser } = useCurrentUserContext();
  const { id } = user;

  const handleChange = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formData = new FormData();
    formData.append("picture", inputRef.current.files[0]);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formData,
    };
    fetch(`${backEnd}/api/avatars/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.warn(result);
        setUser({ ...user, avatar: result.avatar });
        setProfileUser({ ...user, avatar: result.avatar });
        setAvatar(result.avatar);
        toast.success("Photo de profil modifiée avec succès !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen pt-5 md:-mt-20 md:ml-40 ">
      <div className="mx-auto rounded-full z-10 md:mt-1 md:ml-12 ">
        <div className="mb-4">
          {avatar && (
            <img
              src={`${backEnd}/uploads/${avatar}`}
              className="rounded-full object-cover w-60 h-60 border-4 border-violet"
              alt="User avatar"
            />
          )}
        </div>
        {profileUser.id === user.id ? (
          <label className="ml-5 md:ml-1 cursor-pointer hover:bg-primary hover:text-white text-primary border border-primary py-3 px-[2.5rem] rounded-[20px] text-md mb-4">
            <input
              type="file"
              id="image-upload"
              name="avatar"
              ref={inputRef}
              className="hidden"
              onChange={handleChange}
            />
            Changer de photo
          </label>
        ) : null}
      </div>

      <div className="flex justify-center shadow-[3px_3px_4px_#C9CBF0] border border-primary rounded-lg w-80 h-72 mx-auto relative top-[-60px] md:ml-0 ">
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
