import React, { Fragment, useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import HeaderAdmin from "./HeaderAdmin";
import editbtn from "../../assets/editbtn.png";
import rubbish from "../../assets/deleteBtn.png";
import croix from "../../assets/close-red.png";
import plus from "../../assets/plus.png";
import file from "../../assets/file.svg";
import DropDownGroup from "./DropDownGroup";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminEspace() {
  const [groupList, setGroupList] = useState([]);
  const [groupId, setGroupId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    fetch(`${backEnd}/api/groups`)
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch(`${backEnd}/api/categories`)
      .then((response) => response.json())
      .then((categories) => {
        setCategoryList(categories);
      });
  }, [refresh]);

  // File upload

  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    setFileName(event.target.files[0].name);
  };

  // Group creation (States, onChange function)

  const [chooseGroup, setChooseGroup] = useState(false);

  const [groupPost, setGroupPost] = useState({
    group_name: "",
    image: "",
  });

  const onChangeGroup = (e) => {
    setGroupPost({
      ...groupPost,
      [e.target.name]: e.target.value,
    });
  };

  // Category creation (states, onChange)

  const [chooseCategory, setChooseCategory] = useState(false);

  const [categoryPost, setCategoryPost] = useState({
    category_name: "",
    image: "",
    group_id: "",
  });

  const onChangeCategory = (e) => {
    setCategoryPost({
      ...categoryPost,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCategoryPost({
      ...categoryPost,
      group_id: groupId,
    });
  }, [groupId]);

  // Everything back to origin and re-mapping

  const resetStates = () => {
    setGroupPost({
      group_name: "",
      image: "",
    });
    setCategoryPost({
      category_name: "",
      image: "",
      group_id: "",
    });
    setChooseGroup(false);
    setChooseCategory(false);
    setFileName("");
    setRefresh(!refresh);
  };

  // Submits for groups and categories

  const onSubmitGroup = (e) => {
    e.preventDefault();
    if (fileName === "") {
      toast.warn("Veuillez choisir une image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (groupPost.group_name) {
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const group = JSON.stringify(groupPost);

      const formData = new FormData();
      formData.append("group", group);
      formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/groups`, requestOptions)
        .then((response) => response.text())
        .then((retour) => {
          console.warn(retour);
          resetStates();
          toast.success(" Groupe créé avec succès !", {
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

  const onSubmitCategory = (e) => {
    e.preventDefault();
    if (!(categoryPost.group_id > 0)) {
      toast.warn("Veuillez choisir un groupe", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (fileName === "") {
      toast.warn("Veuillez choisir une image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (categoryPost.category_name && categoryPost.group_id) {
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const category = JSON.stringify(categoryPost);

      const formData = new FormData();
      formData.append("category", category);
      formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/categories`, requestOptions)
        .then((response) => response.text())
        .then((retour) => {
          console.warn(retour);
          resetStates();
          toast.success("Catégorie créée avec succès !", {
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

  // Group deletion
  const handleDeleteGroup = (group) => {
    axios
      .delete(`${backEnd}/api/groups/${group}`)
      .then(() => {
        setRefresh(!refresh);
        toast.success("Groupe Supprimé !", {
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
  };

  // Category deletion
  const handleDeleteCategory = (category) => {
    axios
      .delete(`${backEnd}/api/categories/${category}`)
      .then(() => {
        setRefresh(!refresh);
        toast.success("Catégorie Supprimée !", {
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
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-8 border-black">
        <h3>Gérer les groupes et les catégories</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        {(chooseGroup || chooseCategory) && (
          <button type="button" onClick={() => resetStates()}>
            <img
              src={croix}
              alt="croix rouge pour effacer"
              className="h-8 w-8 md:h-8 md:w-8 mb-8"
            />
          </button>
        )}
        {!chooseGroup && !chooseCategory && (
          <button
            type="button"
            onClick={() => setChooseGroup(true)}
            className="flex w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
          >
            <img className="w-8 h-8 mt-0 mr-3" src={plus} alt="ajouter" />
            Ajouter un nouveau groupe
          </button>
        )}
        {chooseGroup && (
          <section className="flex w-[74vw] h-18 items-center justify-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm">
            <form
              onSubmit={(e) => onSubmitGroup(e)}
              method="PUT"
              encType="multipart/form-data"
              className="flex flex-col items-center w-full"
            >
              <h3>Ajouter un nouveau groupe</h3>
              <input
                type="text"
                className="border border-primary w-full h-10 my-4 rounded-md text-center"
                placeholder="Group name"
                name="group_name"
                value={groupPost.group_name}
                onChange={onChangeGroup}
              />
              <label className="flex flex-col items-center text-md md:text-lg font-light text-primary  cursor-pointer">
                <img
                  className="w-7 h-7 md:w-9 md:h-9"
                  src={file}
                  alt="New file"
                />
                <input
                  className="hidden"
                  type="file"
                  value={setGroupPost.image}
                  name="image"
                  ref={inputRef}
                  onChange={handleFileUpload}
                />
                {fileName.length > 0 ? `${fileName}` : "Fichier"}
              </label>
              <button type="submit">
                <img className="w-8 h-8 my-2" src={plus} alt="ajouter" />
              </button>
            </form>
          </section>
        )}
        {!chooseGroup && !chooseCategory && (
          <button
            type="button"
            onClick={() => setChooseCategory(true)}
            className="flex w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
          >
            <img className="w-8 h-8 mt-0 mr-3" src={plus} alt="ajouter" />
            Ajouter un nouvelle catégorie
          </button>
        )}
        {chooseCategory && (
          <section className="flex w-[74vw] h-18 items-center justify-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm">
            <form
              onSubmit={(e) => onSubmitCategory(e)}
              method="PUT"
              encType="multipart/form-data"
              className="flex flex-col items-center w-full"
            >
              <h3>Ajouter une nouvelle catégorie</h3>
              <input
                type="text"
                className="border border-primary w-full h-10 my-4 rounded-md text-center"
                placeholder="Category name"
                name="category_name"
                value={categoryPost.category_name}
                onChange={onChangeCategory}
              />
              {groupId > 0 ? (
                groupList
                  .filter((group) => group.id === groupId)
                  .map((group) => (
                    <h3
                      className="text-center my-4 bg-violet w-auto rounded-sm"
                      key={group.id}
                    >
                      Groupe: {group.group_name}
                    </h3>
                  ))
              ) : (
                <h3 className="text-center my-4">
                  Associez la catégorie à un groupe
                </h3>
              )}

              <DropDownGroup setGroupId={setGroupId} />
              <label className="flex flex-col items-center text-md md:text-lg font-light text-primary  cursor-pointer">
                <img
                  className="w-7 h-7 md:w-9 md:h-9"
                  src={file}
                  alt="New file"
                />
                <input
                  className="hidden"
                  type="file"
                  value={setCategoryPost.image}
                  name="image"
                  ref={inputRef}
                  onChange={handleFileUpload}
                />
                {fileName.length > 0 ? `${fileName}` : "Fichier"}
              </label>
              <button type="submit">
                <img className="w-10 h-10 mt-4 mb-2" src={plus} alt="ajouter" />
              </button>
            </form>
          </section>
        )}
      </div>

      <div className=" flex justify-around mb-10">
        <input
          className="w-[80vw] border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
          type="text"
          placeholder="Rechercher..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="flex flex-col items-center w-screen">
        {groupList
          .filter((group) =>
            group.group_name.toLowerCase().includes(searchInput)
          )
          .map((group) => (
            <Menu
              as="div"
              className="relative inline-block text-left"
              key={group.id}
            >
              <div className="flex justify-between items-center">
                <Menu.Button className="flex justify-between w-[80vw] h-20 items-center text-primary font-[Enedis] bg-white text-xl	font-bold border p-1 px-8 mb-6 border-primary rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  <div className="flex justify-start text-start">
                    {group.group_name}
                  </div>
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <div className="flex flex-col mb-7">
                  <div>
                    <button type="button">
                      <img
                        className="w-5 h-5 mt-3 ml-3"
                        src={editbtn}
                        alt="stylo"
                      />
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <img
                        className="w-5 h-5 mt-3 ml-3"
                        src={rubbish}
                        alt="poubelle"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-0 w-[90vw] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {categoryList
                      .filter((category) => category.group_id === group.id)
                      .map((category) => (
                        <div
                          className="flex justify-between"
                          key={`${group.id},${category.id}`}
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                role="button"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                // onClick={() => setGroupId(group.id)}
                                onKeyDown={(e) => {
                                  if (e.key === "ArrowDown") {
                                    // ...
                                  } else if (e.key === "ArrowUp") {
                                    // ...
                                  }
                                }}
                                tabIndex={0}
                              >
                                <p className="text-lg">
                                  {category.category_name}
                                </p>
                              </div>
                            )}
                          </Menu.Item>
                          <div className="pr-2">
                            <button type="button">
                              <img
                                className="w-4 h-4 mt-3 ml-3"
                                src={editbtn}
                                alt=""
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <img
                                className="w-4 h-4 mt-3 ml-3"
                                src={rubbish}
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ))}
      </div>
    </div>
  );
}

export default AdminEspace;
