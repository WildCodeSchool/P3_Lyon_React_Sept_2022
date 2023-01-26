import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCurrentUserContext } from "../../../contexts/userContext";
import { EditPost } from "../..";
import menuDots from "../../../assets/modifDot.png";
import rubish from "../../../assets/deleteBtn.png";
import edit from "../../../assets/edit.png";
import pdf from "../../../assets/pdf.png";
// import { useCurrentUserContext } from "../../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Post({ post, deleteFromPostWithId }) {
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const { user } = useCurrentUserContext();
  // three dots button and modifying stuff
  const navigate = useNavigate();

  const formatDate = (date) => {
    return date.slice(0, 10).split("-").reverse().join("-");
  };

  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal.id);
  };

  const handleDelete = () => {
    if (user.id === post.user_id) {
      axios
        .delete(`${backEnd}/api/posts/${post.id}`)
        .then(() => {
          toast(" ✅ Poste Supprimé !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
          deleteFromPostWithId(post.id);
        })
        .catch((err) => {
          if (err === 401) {
            console.error(err);
            navigate("/");
            toast(" ✅ Veuillez vous reconnecter !", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "light",
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 md:rounded-lg md:max-w-2xl ">
        <div className="flex flex-row self-start py-4 px-6">
          <Link user={user} to={`/profile/${post.user_id}`}>
            <img
              className="rounded-full object-cover w-20 h-20 mr-6 border-4 border-violet md:mr-20"
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
              <div className="flex flex-col md:w-60">
                <h3 className="font-light text-primary">{post.group_name}</h3>
                <h3 className="font-light text-primary">
                  {post.category_name}
                </h3>
                <h3 className="text-gray-400 font-light">
                  {formatDate(post.post_date)}
                </h3>
              </div>
              {(post.user_id === user.id || user.is_admin) && (
                <div className="flex justify-end md:ml-36 md:mt-[-30px]">
                  <button onClick={() => handleEditPost()} type="button">
                    <img
                      className="h-5 ml-12 md:mt-0 md:ml-20"
                      src={menuDots}
                      alt="Menu"
                    />
                  </button>
                </div>
              )}
              {editPostMenu && (
                <div className=" mt-2 w-52 absolute block rounded-md shadow-lg bg-white ring-1 z- ring-black ring-opacity-5 focus:outline-none md:ml-72 ">
                  {post.user_id === user.id && (
                    <button
                      onClick={() => handleEditPostModal()}
                      className="text-black p-2 flex"
                      type="button"
                    >
                      <img className="h-5 w-5" src={edit} alt="Edit" />
                      <span className="pl-3">Modifier</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-black p-2 flex"
                    type="button"
                  >
                    <img className="h-5 w-5" src={rubish} alt="Edit" />
                    <span className="pl-3">Supprimer</span>
                  </button>
                  {/* </div> */}
                  {editPostModal && (
                    <EditPost
                      user={user}
                      post={post}
                      setEditPostMenu={setEditPostMenu}
                      editPostModal={editPostModal}
                      setEditPostModal={setEditPostModal}
                      handleEditPostModal={handleEditPostModal}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Link to={`/feed/${post.id}`}>
          <div className="px-6 w-[390px] md:w-[640px]">
            <h2 className="text-black text-left pb-1 text-xl">{post.title}</h2>
            <p className="text-md py-2">
              {post.content.length < 151
                ? post.content
                : post.content.slice(0, 150)}
              {post.content.length > 150 && (
                <span className="text-primary text-base"> ... voir plus</span>
              )}
            </p>
          </div>
        </Link>

        {post.post_image &&
          (post.post_image.slice(-4) === ".pdf" ? (
            <div className="flex flex-row w-6/12 pl-3 py-6 ml-3 shadow-md rounded-xl">
              <img className="w-5 h-5 mr-2" src={pdf} alt="pdf" />
              <a
                href={`${backEnd}/uploads/${post.post_image}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-md"
              >
                Visualiser le PDF
              </a>
            </div>
          ) : (
            <img
              className="object-cover md:h-96 mx-auto"
              src={`${backEnd}/uploads/${post.post_image}`}
              alt="Post"
            />
          ))}

        <Link to={`/feed/${post.id}`}>
          <div className="w-full mt-6 pl-4 flex items-center pb-6">
            <img
              className="rounded-full w-10 mr-2 h-10 border-4 border-violet"
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
