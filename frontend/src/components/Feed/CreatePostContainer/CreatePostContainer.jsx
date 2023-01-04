/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import CreatePost from "./CreatePost";

function CreatePostContainer() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  function openModalFull() {
    setShowCreatePost(!showCreatePost);
  }

  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 flex items-center justify-center p-6">
        <img
          className="rounded-full w-24 mr-2 border-4 border-violet"
          src="./src/assets/my-avatar.jpeg"
          alt="My profile avatar"
        />
        <div className="border border-primary w-5/6 rounded-xl h-10 pt-2">
          <button onClick={() => openModalFull()}>
            <span className="ml-2 text-gray-400">Votre publication...</span>
          </button>
          {showCreatePost ? (
            <CreatePost
              showCreatePost={showCreatePost}
              setShowCreatePost={setShowCreatePost}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePostContainer;
