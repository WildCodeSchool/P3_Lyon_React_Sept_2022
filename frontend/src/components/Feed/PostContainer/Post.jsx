import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useCurrentUserContext } from "../../../contexts/userContext";
import EditPost from "./EditPost";
import menuDots from "../../../assets/menu-dots.png";
import "react-toastify/dist/ReactToastify.css";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function Post({ post }) {
  const { handleReset } = usePostUserContext();
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const { user } = useCurrentUserContext();

  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal);
  };

  const handleDelete = () => {
    if (user.id === post.user_id) {
      axios
        .delete(`http://localhost:5000/api/posts/${post.id}`)
        .then(() => {
          handleReset();
          toast(" ✅ Poste Supprimé !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="bg-white w-full shadow-lg rounded-t-sm border-t border-gray-100 mt-10 md:rounded-lg md:max-w-2xl md:gap-2 md:mr-8">
        <div className="flex flex-row self-start py-4 px-6 shadow-md">
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
            <div className="flex">
              <div className="flex flex-col">
                <h3 className="font-light text-primary">{post.group_name}</h3>
                <h3 className="font-light text-primary">
                  {post.category_name}
                </h3>
                <h3 className="text-gray-400 font-light">1h</h3>
              </div>
              <div className="pt-2 md:ml-[250px] md:mt-[-30px]">
                <button onClick={() => handleEditPost()} type="button">
                  <img className="h-8" src={menuDots} alt="Menu" />
                </button>
              </div>
              {editPostMenu ? (
                <div className=" mt-2 w-40 relative rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
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
                  <button
                    onClick={() => handleDelete()}
                    className="text-black p-4 flex"
                    type="button"
                  >
                    <img
                      className="h-5 w-5"
                      src="./src/assets/edit.png"
                      alt="Edit"
                    />
                    <span className="pl-3">supprimer</span>
                  </button>

                  {editPostModal ? (
                    <EditPost
                      editPostModal={editPostModal}
                      setEditPostModal={setEditPostModal}
                      handleEditPostModal={handleEditPostModal}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <h2 className="text-black self-start my-2 text-center">{post.title}</h2>
        <br />
        {post.post_image && (
          <img
            className="w-full mx-auto"
            src={`http://localhost:5000/uploads/${post.post_image}`}
            alt="Post"
          />
        )}

        <Link to={`/feed/${post.id}`}>
          <div className="flex flex-col justify-center items- shadow-md w-[390px] md:w-[640px]">
            {post.firstname} {post.lastname}
            <p className="text-sm">
              {post.content}...
              <span className="text-primary text-base"> voir plus</span>
            </p>
          </div>

          <div className="w-full mt-6 ml-4 flex items-center pb-6">
            <img
              className="rounded-full w-10 h-10 border-4 border-violet"
              src={user.avatar}
              alt="My profile avatar"
            />
            <div className="w-72 shadow-md text-left pl-3 rounded-xl py-2 text-sm text-gray-500">
              Laissez un commentaire...
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
