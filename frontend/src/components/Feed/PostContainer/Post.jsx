/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";

function Post({ comment }) {
  const [postDetails, setPostDetails] = useState(false);

  const openPostDetails = () => {
    setPostDetails(!postDetails);
  };

  return (
    <div>
      {/* <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-10">
        <div className="flex flex-row self-start py-4 px-6">
          <img
            className="rounded-full w-20 mr-6 border-4 border-violet"
            src={`./src/assets/${comment.avatar}`}
            alt={`${comment.username}'s avatar`}
          />
          <div className="flex flex-col">
            <Link to={`/profile/${comment.user_id}`}>
              <h2 className="text-primary">{comment.username}</h2>
            </Link>
            <h3 className="font-light text-primary">{comment.category}</h3>
            <h3 className="text-gray-400 font-light">1h</h3>
          </div>
        </div>
        <img src={`./src/assets/${comment.image}`} alt="Post" />

        <h2 className="text-primary self-start my-2">{comment.title}</h2>
        <p className="self-start text-sm">
          {comment.article}...
          <button onClick={() => openPostDetails()} type="button">
            <span className="text-primary text-sm"> voir plus</span>
          </button>
        </p>

        {postDetails ? (
          <PostDetails
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
        ) : (
          ""
        )}
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
      </div> */}

      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10">
        <div className="flex flex-row self-start py-4 px-6">
          <Link to="/profile">
            <img
              className="rounded-full w-20 mr-6 border-4 border-violet"
              src={`./src/assets/${comment.avatar}`}
              alt={`${comment.username}'s avatar`}
            />
          </Link>
          <div className="flex flex-col">
            <Link to="/profile">
              <h2 className="text-primary">{comment.username}</h2>
            </Link>
            <h3 className="font-light text-primary">{comment.category}</h3>
            <h3 className="text-gray-400 font-light">1h</h3>
          </div>
        </div>
        <img src={`./src/assets/${comment.image}`} alt="Post" />
        <div className="px-6">
          <button onClick={() => openPostDetails()} type="button">
            <h2 className="text-black self-start my-2">{comment.title}</h2>
            <p className="self-start text-sm">
              {comment.article}..
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

      {/* <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-10">
        <div className="flex flex-row self-start py-4 px-6">
          <img
            className="rounded-full w-20 mr-6 border-4 border-green"
            src="./src/assets/user-avatar2.jpeg"
            alt="User avatar"
          />
          <div className="flex flex-col">
            <h2 className="text-primary">Michael Jackson</h2>
            <h3 className="font-light text-primary">
              Prévention - Affichage réglementaire
            </h3>
            <h3 className="text-gray-400 font-light">3j</h3>
          </div>
        </div>
        <div className="px-6">
          <h2 className="text-black self-start my-2">
            Nouvelle réglementation
          </h2>
          <p className="self-start text-sm">
            La RT 2020 entrera en vigueur au 1er janvier 2023. Elle impose la
            construction de bâtiments à énergie positive et de maisons passives.
            La RT 2020 se différencie de la réglementation thermique 2012 sur le
            type de bâtiments concernés.
          </p>
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
      </div> */}
    </div>
  );
}

export default Post;
