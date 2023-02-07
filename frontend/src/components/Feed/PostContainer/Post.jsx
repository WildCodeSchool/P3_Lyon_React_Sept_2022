import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCurrentUserContext } from "../../../contexts/userContext";
import pdf from "../../../assets/pdf.png";
import DropDownDeletePost from "./DropDownDeletePost";
// import { useCurrentUserContext } from "../../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

const date = new Date();

const currentDate = `${date.getFullYear()}${`0${date.getMonth() + 1}`.slice(
  -2
)}${`0${date.getDate()}`.slice(-2)}-${date.getHours()}:${date.getMinutes()}`;

function Post({ post, deleteFromPostWithId }) {
  const { user } = useCurrentUserContext();
  // three dots button and modifying stuff
  const navigate = useNavigate();

  const postDate = post.post_date.slice(0, 10).split("-").reverse().join("-");
  const postTime = post.post_date.slice(11, 16);

  const handleDelete = () => {
    if (user.id === post.user_id || user.is_admin) {
      axios
        .delete(`${backEnd}/api/posts/${post.id}`)
        .then(() => {
          toast.success("Publication supprimée !", {
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
      <div className="bg-white w-full shadow-md rounded-t-sm mt-5 md:rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row self-start pt-2 pb-4 px-6">
            <Link to={`/profile/${post.user_id}`}>
              <img
                className="rounded-full object-cover w-20 h-20 mr-6 border-4 border-violet"
                src={`${backEnd}/uploads/${post.avatar}`}
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
                    {postDate.split("-").reverse().join("") ===
                      currentDate.slice(0, 8) && `${postTime}`}
                    {currentDate.slice(0, 8) -
                      postDate.split("-").reverse().join("") ===
                      1 && "Hier"}
                    {currentDate.slice(0, 8) -
                      postDate.split("-").reverse().join("") >
                      1 && `${postDate}`}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="self-start">
            {(post.user_id === user.id || user.is_admin) && (
              <DropDownDeletePost handleDelete={handleDelete} />
            )}
          </div>
        </div>
        <Link to={`/feed/${post.id}`}>
          <div className="px-6 w-[390px] md:w-full">
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
              className="object-cover md:h-96 mx-auto md:w-full"
              src={`${backEnd}/uploads/${post.post_image}`}
              alt="Post"
            />
          ))}

        <Link to={`/feed/${post.id}`}>
          {post.nbcomments > 0 && (
            <p className="pl-6 mt-4 text-sm text-gray-500">
              {post.nbcomments > 1
                ? `${post.nbcomments} commentaires`
                : `${post.nbcomments} commentaire`}
            </p>
          )}

          <div className="w-full mt-6 pl-4 flex items-center pb-6">
            <img
              className="rounded-full w-10 mr-2 h-10 border-4 border-violet"
              src={`${backEnd}/uploads/${user.avatar}`}
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
