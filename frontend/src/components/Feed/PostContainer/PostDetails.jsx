/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line react/prop-types
function PostDetails({ postDetails, setPostDetails, post }) {
  const closePostDetails = () => {
    setPostDetails(!postDetails);
  };
  return (
    <div className="bg-white fixed top-0 left-0 z-10 h-screen w-screen overflow-y-scroll">
      <button type="button" onClick={() => closePostDetails()}>
        <img className="mr-80 mt-6" src="./src/assets/croix.png" alt="Close" />
      </button>
      <div className="flex flex-row items-center py-6 px-10">
        <img
          className="rounded-full w-24 mr-6 border-4 border-violet"
          src="./src/assets/avatar-user.jpeg"
          alt="User avatar"
        />
        <h2 className="text-primary text-3xl text-left">{post.title}</h2>
      </div>
      <div className="flex justify-evenly px-4">
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px]">
          {post.group_name}
        </div>
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px]">
          {post.category_name}
        </div>
      </div>
      <img className="mt-10" src="./src/assets/picture-post.jpg" alt="Post" />
      <p className="bg-white text-md p-8">{post.content}</p>
      <h2 className="font-bold text-center">Ouvrir le pdf :</h2>
      <div className="flex items-center justify-center text-center pb-2">
        <div
          className="w-2/5 flex flex-col justify-center items-center shadow-md rounded-xl py-4 text-sm
        placeholder-gray-500 focus:placeholder-gray-400"
        >
          <img className="h-8 w-8 pr-1" src="./src/assets/pdf.png" alt="PDF" />
          participants.pdf
        </div>
      </div>
      <div className="w-full mt-6 flex items-center px-6">
        <img
          className="rounded-full w-10 mr-4 border-4 border-green"
          src="./src/assets/user-avatar2.jpeg"
          alt="My profile avatar"
        />

        <div className="flex flex-col w-screen">
          <h3 className="font-light self-start text-[#ABA1A1] text-[9px]">
            Michael Jackson
          </h3>
          <input
            className="w-5/6 shadow-md rounded-xl py-4 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
            type="text"
            value="Super idée ! On fait Secret Santa ?"
          />
        </div>
      </div>
      <div className="w-full mt-6 flex items-center justify-between px-6 pb-6">
        <img
          className="rounded-full w-10 mr-4 border-4 border-violet"
          src="./src/assets/my-avatar.jpeg"
          alt="My profile avatar"
        />
        <input
          className="w-5/6 shadow-md rounded-xl py-4 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
          type="text"
          placeholder="Laissez un commentaire..."
        />
      </div>
    </div>
  );
}

export default PostDetails;
