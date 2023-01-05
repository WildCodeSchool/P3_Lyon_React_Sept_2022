import React from "react";

function PostDetails() {
  return (
    <div className="h-screen">
      <div className="flex flex-row items-center p-10">
        <img
          className="rounded-full w-20 mr-6 border-4 border-violet"
          src="./src/assets/avatar-user.jpeg"
          alt="User avatar"
        />
        <h2 className="text-primary text-3xl text-left">
          Com interne : organisation repas de Noël
        </h2>
      </div>
    </div>
  );
}

export default PostDetails;
