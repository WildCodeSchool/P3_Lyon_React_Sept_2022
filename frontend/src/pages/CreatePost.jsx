import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import croix from "../assets/croix.png";
import file from "../assets/file.svg";
import { SelectBar, ModalCreatePost } from "../components";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function CreatePost() {
  const { valueSelectedCategory, valueSelectedGroup } = usePostUserContext();
  const [fileName, setFileName] = useState("");

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
    if (valueSelectedCategory === "") {
      toast.warn("Veuillez renseigner la catégorie de la publication", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (
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
          navigate("/feed");
          toast.success(" Publié avec succès !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch(console.error());
    }
  };

  const handleFileUpload = (event) => {
    setFileName(event.target.files[0].name);
  };

  return (
    <div className="bg-white md:bg-[#F6F6fe] md:h-screen">
      <div className="md:border-r-2 md:border-gray-100">
        <Link to="/feed">
          <img
            className="ml-2 mt-6 md:mt-0 md:pt-2 md:w-10 md:h10"
            src={croix}
            alt=""
          />
        </Link>
        <h1 className="text-[32px] md:text-4xl mt-3 text-primary font-bold text-center md:m-auto pb-8 md:pb-4">
          Créer une publication
        </h1>

        {/* Formulaire Pour publier un post  */}
        <form
          onSubmit={(e) => onSubmit(e)}
          method="PUT"
          encType="multipart/form-data"
          className="mb-5 md:bg-[white] md:flex md:items-center md:justify-center md:flex-col md:shadow-md sm:w-4/5 xl:w-3/5 md:border md:border-gray-200 md:m-auto"
        >
          <div className="flex items-center md:justify-start md:mr-60 md:mt-7">
            <img
              className="rounded-full object-cover w-28 h-28 sm:w-48 sm:h-48 ml-3 md:ml-6 border-4 border-violet"
              src={user.avatar}
              alt="Avatar"
            />
            <div className="block text-left">
              <div className="flex">
                <h2
                  className="text-2xl ml-[24px] sm:ml-5 sm:text-4xl text-green font-bold "
                  value={user.firstname}
                >
                  {user.firstname}
                </h2>
                <h2
                  className="text-2xl ml-2 sm:text-4xl text-green w-10 font-bold "
                  value={user.lastname}
                >
                  {user.lastname}
                </h2>
              </div>

              <p className="text-md md:text-xl ml-[24px] text-primary">
                {valueSelectedGroup}
              </p>
              <p
                className="text-md md:text-xl ml-[24px] text-primary"
                value={valueSelectedCategory}
                name={valueSelectedCategory}
              >
                {valueSelectedCategory.category_name}
              </p>
            </div>
          </div>
          <div>
            <input
              className="mt-8 h-[5em] md:text-xl w-full pl-8"
              type="text"
              placeholder="Titre... *"
              name="title"
              value={dataPost.title}
              onChange={onChange}
            />
            <hr className="h-[2px] bg-grey w-[100vw] md:w-[50vw]" />
            <input
              className="h-60 md:text-xl w-full pl-8"
              type="text"
              name="content"
              placeholder="Votre publication... *"
              value={dataPost.content}
              onChange={onChange}
            />
          </div>
          <hr className="h-[2px] bg-grey w-[100vw] md:w-[70vw] xl:w-[60vw]" />
          <p className="text-sm mt-3 md:mt-0 ml-4 font-light text-[#070D4F]">
            {fileName}
          </p>
          <div className="flex items-center justify-around mt-5 md:justify-end md:w-11/12 md:mr-6 md:mb-3">
            <label className="flex flex-col items-center text-md md:text-lg font-light text-primary pl-6 md:mr-10 cursor-pointer">
              <img
                className="w-7 h-7 mr-2 md:w-9 md:h-9"
                src={file}
                alt="New file"
              />
              <input
                className="hidden"
                type="file"
                value={dataPost.image}
                name="avatar"
                ref={inputRef}
                onChange={handleFileUpload}
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
          <hr className="h-[2px] bg-grey w-[100vw] md:w-[70vw] xl:w-[60vw]" />
          <div className="w-11/12 flex justify-center items-center">
            <button
              type="submit"
              className="bg-primary hover:bg-[#0d17a1] text-white py-3 mt-8 w-40 md:w-48 
         rounded-3xl md:mb-2 md:mt-5"
            >
              Publier
            </button>
          </div>
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
