/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";

function Post({ post }) {
  const [postDetails, setPostDetails] = useState(false);

  const openPostDetails = () => {
    setPostDetails(!postDetails);
  };

  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10">
        <div className="flex flex-row self-start py-4 px-6">
          <Link to={`/profile/${post.user_id}`}>
            <img
              className="rounded-full w-20 mr-6 border-4 border-violet"
              src={`./src/assets/${post.avatar}`}
              alt={`${post.username}'s avatar`}
            />
          </Link>
          <div className="flex flex-col">
            <Link to="/profile">
              <h2 className="text-primary">{post.username}</h2>
            </Link>
            <h3 className="font-light text-primary">{post.category}</h3>
            <h3 className="text-gray-400 font-light">1h</h3>
          </div>
        </div>
        <img src={`./src/assets/${post.image}`} alt="Post" />
        <div className="px-6">
          <button onClick={() => openPostDetails()} type="button">
            <h2 className="text-black self-start my-2">{post.title}</h2>
            <p className="self-start text-sm">
              {post.article}..
              <span className="text-primary text-base"> voir plus</span>
              {postDetails ? (
                <PostDetails
                  postDetails={postDetails}
                  setPostDetails={setPostDetails}
                />
              ) : (
                ""
              )}
            </p>
          </button>
          <div className="w-full mt-6 flex items-center justify-between pb-6">
            <img
              className="rounded-full w-10 mr-2 border-4 border-violet"
              src="./src/assets/my-avatar.jpeg"
              alt="My profile avatar"
            />
            <input
              className="w-5/6 shadow-md rounded-xl py-2 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
              type="text"
              placeholder="Laissez un commentaire..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
