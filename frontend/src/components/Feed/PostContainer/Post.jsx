/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import { useCurrentUserContext } from "../../../contexts/userContext";

function Post({ post }) {
  const [postDetails, setPostDetails] = useState(false);
  const { user } = useCurrentUserContext();

  const openPostDetails = () => {
    setPostDetails(!postDetails);
  };

  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-10 md:rounded-lg">
        <div className="flex flex-row self-start py-4 px-6">
          <Link to={`/profile/${post.user_id}`}>
            <img
              className="rounded-full w-20 h-20 mr-6 border-4 border-violet"
              src={post.avatar}
              alt={post.username}
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.user_id}`}>
              <div className="flex gap-2">
                <h2 className="text-primary">{post.firstname} </h2>
                <h2 className="text-primary">{post.lastname}</h2>
              </div>
            </Link>
            <h3 className="font-light text-primary">{post.group_name}</h3>
            <h3 className="font-light text-primary">{post.category_name}</h3>
            <h3 className="text-gray-400 font-light">1h</h3>
          </div>
        </div>
        {post.post_image && (
          <img
            className="w-full mx-auto"
            src={`http://localhost:5000/uploads/${post.post_image}`}
            alt="Post"
          />
        )}

        <button onClick={() => openPostDetails()} type="button">
          <div className="flex flex-col justify-center items- ml-4">
            <h2 className="text-black self-start my-2">{post.title}</h2>
            <p className="self-start text-sm">
              {post.content}...
              <span className="text-primary text-base"> voir plus</span>
            </p>
          </div>
          <div className="w-full mt-6 ml-4 flex items-center justify-between pb-6">
            <img
              className="rounded-full w-10 h-10 border-4 border-violet"
              src={user.avatar}
              alt="My profile avatar"
            />
            <div className="w-72 shadow-md text-left pl-3 rounded-xl py-2 text-sm text-gray-500">
              Laissez un commentaire...
            </div>
          </div>
        </button>
        {postDetails ? (
          <PostDetails
            postDetails={postDetails}
            setPostDetails={setPostDetails}
            post={post}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Post;
