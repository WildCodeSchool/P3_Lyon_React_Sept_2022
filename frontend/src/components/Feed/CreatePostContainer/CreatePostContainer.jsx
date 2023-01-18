/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/button-has-type */
// eslint-disable-next-line import/no-useless-path-segments
import React from "react";
import CreatePost from "./CreatePost";
import Avatar from "../../../components/Navbar/Avatar";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function CreatePostContainer() {
  const { showCreatePost, setShowCreatePost } = usePostUserContext();

  return (
    <div className=" md:ml-[-85%] md:w-[66vw] md:mb-4 ">
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 flex items-center justify-center p-6 md:h-28 md:rounded-lg ">
        <div className="rounded-full">
          <Avatar />
        </div>

        <div className="border border-primary w-5/6 rounded-xl h-10 pt-2">
          <button onClick={() => setShowCreatePost(!showCreatePost)}>
            <span className="ml-2 text-gray-400">Votre publication...</span>
          </button>
          {showCreatePost ? <CreatePost /> : ""}
        </div>
      </div>
    </div>
  );
}

export default CreatePostContainer;
