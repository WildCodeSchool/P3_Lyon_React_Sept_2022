import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import croix from "../assets/croix.png";
import "../App.css";
import SelectBar from "../components/Feed/CreatePostContainer/SelectBar";
import ModalCreatePost from "../components/Feed/CreatePostContainer/ModalCreatePost";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";
import "react-toastify/dist/ReactToastify.css";
import file from "../assets/file.svg";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function CreatePost() {
  const { valueSelectedCategory, valueSelectedGroup, handleReset } =
    usePostUserContext();
  const { user } = useCurrentUserContext();
  const inputRef = useRef(null);
  const [dataPost, setDataPost] = useState({
    title: "",
    content: "",
    user_id: user.id,
    category_id: valueSelectedCategory,
    post_image: "",
  });
  const navigate = useNavigate();

  const [showCategories, setShowCategories] = useState(false);

  const onChange = (e) => {
    setDataPost({
      ...dataPost,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setDataPost({
      ...dataPost,
      category_id: valueSelectedCategory.id,
    });
  }, [valueSelectedCategory]);
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      dataPost.title &&
      dataPost.content &&
      dataPost.user_id &&
      dataPost.category_id
    ) {
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const post = JSON.stringify(dataPost);

      const formData = new FormData();
      formData.append("post", post);
      formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/posts`, requestOptions)
        .then((response) => response.text())
        .then((retour) => {
          console.warn(retour);
          handleReset();
          navigate("/feed");
          toast(" ✅ Poste Publié !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        })
        .catch(console.error());
    }
  };

  return (
    <div className="bg-white md:backdrop-blur-lg md:shadow-md ">
      <div className="md:w-1/2 md:border-r-2 md:border-gray-100">
        <Link to="/feed">
          <img className="ml-2 mt-6 md:mt-2" src={croix} alt="" />
        </Link>
        <h1 className="text-[32px] mt-3 text-primary font-bold text-center md:mr-32 pb-8 md:pb-0 md:mt-2 ">
          Créer une publication
        </h1>

        {/* Formulaire Pour publier un post  */}
        <form
          onSubmit={(e) => onSubmit(e)}
          method="PUT"
          encType="multipart/form-data"
          className="mb-5"
        >
          <div className="flex items-center">
            <img
              className="rounded-full object-cover w-28 h-28 ml-3 border-4 border-violet"
              src={user.avatar}
              alt="Avatar"
            />
            <div className="block text-left">
              <div className="flex">
                <h2
                  className="text-2xl ml-[24px] text-green font-bold "
                  value={user.firstname}
                >
                  {user.firstname}
                </h2>
                <h2
                  className="text-2xl ml-2 text-green w-10 font-bold "
                  value={user.lastname}
                >
                  {user.lastname}
                </h2>
              </div>

              <p className="text-md ml-[24px] text-primary">
                {valueSelectedGroup}
              </p>
              <p
                className="text-md ml-[24px] text-primary"
                value={valueSelectedCategory}
                name={valueSelectedCategory}
              >
                {valueSelectedCategory.category_name}
              </p>
            </div>
          </div>
          <div>
            <input
              className="mt-8 h-[5em] w-full pl-8"
              type="text"
              placeholder="Titre... *"
              name="title"
              value={dataPost.title}
              onChange={onChange}
            />
            <hr className="h-[2px] bg-grey w-[100vw] md:w-[50vw]" />
            <input
              className="h-60 w-full pl-8"
              type="text"
              name="content"
              placeholder="Votre publication... *"
              value={dataPost.content}
              onChange={onChange}
            />
          </div>
          <hr className="h-[2px] bg-grey w-[100vw] md:w-[50vw]" />
          <div className="flex items-center justify-start mt-8">
            <label className="flex flex-col items-center text-md font-light text-primary pl-6 cursor-pointer">
              <img className="w-7 h-7 mr-2" src={file} alt="New file" />
              <input
                className="hidden"
                type="file"
                value={dataPost.image}
                name="avatar"
                ref={inputRef}
              />
              Fichier
            </label>
            <div>
              <SelectBar
                showCategories={showCategories}
                setShowCategories={setShowCategories}
              />
            </div>
          </div>
          <hr className="h-[2px] mt-4 bg-grey w-[100vw] md:w-[50vw]" />
          <button
            type="submit"
            className="bg-[#1423DC] hover:bg-[#0d17a1] text-white py-3 px-[2.5rem] mt-6 ml-[50%] w-40 md:ml-[38%] md:w-48 
         rounded-[20px] justify-end"
          >
            Publier
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

export default CreatePost;
