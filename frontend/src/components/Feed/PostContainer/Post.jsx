/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../../contexts/userContext";
import PostDetails from "./PostDetails";
import menuDots from "../../../assets/modifDot.png";
import EditPost from "./EditPost";
import rubish from "../../../assets/deleteBtn.png";
// import { useCurrentUserContext } from "../../../contexts/userContext";

function Post({ post }) {
  // const { user } = useCurrentUserContext();
  const [postDetails, setPostDetails] = useState(false);
  const { user } = useCurrentUserContext();
  // three dots button and modifying stuff
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);

  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal);
  };

  const openPostDetails = () => {
    setPostDetails(!postDetails);
  };
  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 md:rounded-lg">
        {(post.user_id === user.id || user.is_admin) && (
          <div className="flex justify-end pt-2">
            <button onClick={() => handleEditPost()} type="button">
              <img className="h-6 mr-4" src={menuDots} alt="Menu" />
            </button>
          </div>
        )}
        {editPostMenu && (
          <div className="origin-top-right absolute right-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {post.user_id === user.id && (
              <button
                onClick={() => handleEditPostModal()}
                className="text-black p-4 flex"
                type="button"
              >
                <img
                  className="h-5 w-5"
                  src="./src/assets/edit.png"
                  alt="Edit"
                />
                <span className="pl-3">Modifier</span>
              </button>
            )}
            <button
              onClick={() => handleEditPostModal()}
              className="text-black p-4 flex"
              type="button"
            >
              <img className="h-5 w-5" src={rubish} alt="Edit" />
              <span className="pl-3">Supprimer</span>
            </button>
            {editPostModal && (
              <EditPost
                editPostModal={editPostModal}
                setEditPostModal={setEditPostModal}
                handleEditPostModal={handleEditPostModal}
              />
            )}
          </div>
        )}
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
                {/* <button
                  type="button"
                  className="border-solid border-2 border-sky-500"
                  onClick={() => console.warn(post)}
                >
                  {" "}
                  Console moi
                </button> */}
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
        <div className="px-6">
          <button onClick={() => openPostDetails()} type="button">
            <h2 className="text-black self-start my-2">{post.title}</h2>
            <p className="self-start text-sm">
              {post.content}..
              <span className="text-primary text-base"> voir plus</span>
            </p>
            <div className="w-full mt-6 flex items-center justify-between pb-6">
              <img
                className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
                src={user.avatar}
                alt="My profile avatar"
              />
              <input
                className="w-11/12 shadow-md rounded-xl py-2 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
                type="text"
                placeholder="Laissez un commentaire..."
              />
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
    </div>
  );
}

export default Post;
