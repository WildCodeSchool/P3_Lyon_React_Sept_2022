import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalCreatePost } from "../..";
import groupe from "../../../assets/groupe.svg";
import { useCurrentUserContext } from "../../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function EditPost({ setEditPostModal, setEditPostMenu, post, user }) {
  // ouvre les groupes et categories via le bouton Catégorie
  const [showCategories, setShowCategories] = useState(false);
  const { token } = useCurrentUserContext();

  // data envoyé au back pour update le post
  const [dataPost, setDataPost] = useState({
    ...post,
  });

  const onChange = (e) => {
    setDataPost({
      ...dataPost,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      dataPost.title &&
      dataPost.content &&
      dataPost.user_id &&
      dataPost.category_id
    ) {
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify(dataPost);

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      };
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/posts/${post.id}`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          toast.success(" Post modifié !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });

          navigate("/profile");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-white h-screen w-screen  overflow-x-hidden z-10 md:bg-[#F6F6fe]">
      <div className="md:border-r-2 md:border-gray-100">
        <button
          onClick={() => {
            setEditPostModal(false);
            setEditPostMenu(false);
          }}
          type="button"
        >
          <img className="ml-2 mt-6" src="./src/assets/croix.png" alt="Close" />
        </button>
        <h1 className="text-[32px] md:text-4xl mt-3 text-primary font-bold text-center md:m-auto pb-8 md:pb-4">
          Modifier sa publication
        </h1>
        <form
          onSubmit={onSubmit}
          method="PUT"
          className="mb-5 md:bg-[white] md:flex md:items-center md:justify-center md:flex-col md:shadow-md sm:w-4/5 xl:w-3/5 md:border md:border-gray-200 md:m-auto md:h-fit"
        >
          <div className="md:flex">
            <img
              className="rounded-full object-cover w-28 h-28 sm:w-32 sm:h-32 ml-3 md:ml-6 border-4 border-violet"
              src={`${backEnd}/uploads/${user.avatar}`}
              alt="Avatar"
            />
            <div>
              <div className="flex items-center md:justify-start md:mr-60 md:mt-7">
                <h2 className="text-2xl ml-[24px] sm:ml-5 sm:text-4xl text-green font-bold">
                  {user.firstname}
                </h2>
                <h2 className="text-2xl ml-[24px] sm:ml-5 sm:text-4xl text-green font-bold">
                  {user.lastname}
                </h2>
              </div>
              <p
                placeholder={post.group_name}
                value={dataPost.group_id}
                className="text-md md:text-xl ml-[24px] text-primary"
              >
                {post.group_name}
              </p>
              <p
                placeholder={post.category_name}
                value={dataPost.category_id}
                className="text-md md:text-xl ml-[24px] text-primary"
              >
                {post.category_name}
              </p>
            </div>
          </div>

          <div>
            <input
              className="mt-8 h-16 md:text-xl w-full pl-8"
              type="text"
              placeholder={post.title}
              name="title"
              value={dataPost.title}
              onChange={onChange}
            />
            <hr className="h-[2px] bg-grey w-[100vw] md:w-[50vw]" />
            <textarea
              className="h-16 md:text-xl w-full pl-8"
              type="text"
              name="content"
              placeholder={post.content}
              value={dataPost.content}
              onChange={onChange}
            />
            {post.post_image && (
              <img
                className="objet-cover"
                src={`${backEnd}/uploads/${post.post_image}`}
                alt="Post"
              />
            )}
          </div>
          <div>
            <button
              className="flex flex-col items-center justify-center cursor-pointer pl-7"
              type="button"
              onClick={() => setShowCategories(!showCategories)}
            >
              <img className="w-7 h-7 md:w-9 md:h-9" src={groupe} alt="Group" />
              <h3 className="text-md font-light text-primary md:text-lg">
                Catégorie
              </h3>
            </button>
          </div>
          <button
            onClick={() => console.warn(dataPost)}
            type="submit"
            className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 mr-3
         rounded-[20px] justify-end"
          >
            Enregistrer
          </button>
        </form>
        {showCategories ? (
          <ModalCreatePost
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        ) : null}
      </div>
    </div>
  );
}

export default EditPost;
