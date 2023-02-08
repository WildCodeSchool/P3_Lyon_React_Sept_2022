import React, { Fragment, useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import HeaderAdmin from "./HeaderAdmin";
import rubbish from "../../assets/deleteBtn.png";
import croix from "../../assets/close-red.png";
import plus from "../../assets/plus.png";
import file from "../../assets/file.svg";
import DropDownGroup from "./DropDownGroup";
import { useCurrentUserContext } from "../../contexts/userContext";

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

  const [modalDeleteGroupe, setModalDeleteGroupe] = useState(false);
  const { token } = useCurrentUserContext();

  useEffect(() => {
    fetch(`${backEnd}/api/groups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch(`${backEnd}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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
    setGroupId(0);
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
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const group = JSON.stringify(groupPost);

      const formData = new FormData();
      formData.append("group", group);
      formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/groups`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          resetStates();
          toast.success(" Groupe créé avec succès !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleModalDeleteGroupe = () => {
    setModalDeleteGroupe(!modalDeleteGroupe);
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
      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");

      const category = JSON.stringify(categoryPost);

      const formData = new FormData();
      formData.append("category", category);
      formData.append("picture", inputRef.current.files[0]);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      // On appelle le back. Si tous les middleware placé sur la route ci-dessous,
      // je pourrais être renvoyé à la route login
      fetch(`${backEnd}/api/categories`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          resetStates();
          toast.success("Catégorie créée avec succès !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch((error) => console.error(error));
    }
  };

  // Group deletion
  const handleDeleteGroup = (group) => {
    axios
      .delete(`${backEnd}/api/groups/${group}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        handleModalDeleteGroupe();
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
      .delete(`${backEnd}/api/categories/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
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
    <div className="min-h-screen md:overflow-x-hidden">
      <Navbar />
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-8 border-black mt-5 xl:mt-10">
        <h3>Gérer les groupes et les catégories</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        {(chooseGroup || chooseCategory) && (
          <button type="button" onClick={() => resetStates()}>
            <img
              src={croix}
              alt="croix rouge pour effacer"
              className="h-8 w-8 mb-8"
            />
          </button>
        )}
        <div className="md:flex">
          {!chooseGroup && !chooseCategory && (
            <button
              type="button"
              onClick={() => setChooseGroup(true)}
              className="flex md:mr-5 w-[74vw] md:w-80 h-18 items-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
            >
              <img className="w-8 h-8  mt-0 mr-3" src={plus} alt="ajouter" />
              Ajouter un nouveau groupe
            </button>
          )}
          {chooseGroup && (
            <section className="flex w-[74vw] md:w-[40vw] h-18 items-center justify-center text-primary font-[Enedis] bg-white font-bold border p-3 px-8 mb-10 border-primary shadow-sm">
              <form
                onSubmit={(e) => onSubmitGroup(e)}
                method="PUT"
                encType="multipart/form-data"
                className="flex flex-col items-center w-full"
              >
                <h3>Ajouter un nouveau groupe</h3>
                <input
                  type="text"
                  className="border border-primary w-full md:w-1/2 h-10 my-4 rounded-md text-center"
                  placeholder="Nom du groupe"
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
              className="flex w-[74vw] md:w-80 h-18 items-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
            >
              <img className="w-8 h-8 mt-0 mr-3" src={plus} alt="ajouter" />
              Ajouter un nouvelle catégorie
            </button>
          )}
          {chooseCategory && (
            <section className="flex w-[74vw] md:w-[40vw] h-18 items-center justify-center text-primary font-[Enedis] bg-white text-l font-bold border p-3 px-8 mb-10 border-primary shadow-sm">
              <form
                onSubmit={(e) => onSubmitCategory(e)}
                method="PUT"
                encType="multipart/form-data"
                className="flex flex-col items-center w-full md:w-1/2"
              >
                <h3>Ajouter une nouvelle catégorie</h3>
                <input
                  type="text"
                  className="border border-primary w-full h-10 my-4 rounded-md text-center"
                  placeholder="Nom de la catégorie"
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

                <DropDownGroup setGroupId={setGroupId} groupList={groupList} />
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
                  <img
                    className="w-10 h-10 mt-4 mb-2"
                    src={plus}
                    alt="ajouter"
                  />
                </button>
              </form>
            </section>
          )}
        </div>
      </div>

      <div className=" flex justify-around mb-10">
        <input
          className="w-[80vw] md:w-6/12 border border-primary rounded-3xl h-12 pl-6 text-sm placeholder-gray-500 focus:border-primary"
          type="text"
          placeholder="Rechercher..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="flex flex-col items-center w-screen pb-36">
        {groupList
          .filter(
            (group) =>
              group.group_name
                .toLocaleLowerCase()
                .includes(searchInput.toLocaleLowerCase()) ||
              group.group_name
                .toLocaleUpperCase()
                .includes(searchInput.toLocaleUpperCase())
          )
          .map((group) => (
            <Menu
              as="div"
              className="relative inline-block text-left"
              key={group.id}
            >
              <div className="flex justify-between items-center">
                <Menu.Button className="flex justify-between w-[70vw] h-20 items-center text-primary font-[Enedis] bg-white text-xl	font-bold border p-1 px-8 mb-6 border-primary rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none">
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
                    <button type="button" onClick={handleModalDeleteGroupe}>
                      <img
                        className="w-5 h-5 mt-3 ml-3"
                        src={rubbish}
                        alt="poubelle"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {modalDeleteGroupe && (
                <div
                  className="relative z-10"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="fixed inset-0 bg-gray-300 bg-opacity-30 transition-opacity" />

                  <div className="fixed inset-0 z-10 ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-[#070D4F] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                              <svg
                                className="h-6 w-6 text-red-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                              </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-lg font-bold leading-6 text-white "
                                id="modal-title"
                              >
                                Confirmer la suppression
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-white">
                                  Êtes vous certain de vouloir supprimer cet
                                  groupe ?
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#070D4F] px-4 py-3 items-center sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            onClick={() => handleDeleteGroup(group.id)}
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Supprimer
                          </button>
                          <button
                            onClick={handleModalDeleteGroupe}
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-0 w-[90vw] md:w-[60vw] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {categoryList
                      .filter((category) => category.group_id === group.id)
                      .map((category) => (
                        <div key={`${group.id},${category.id}`}>
                          <div className="flex justify-between">
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
                            <div className="pr-6">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              >
                                <img
                                  className="w-4 h-4 mt-3 ml-3"
                                  src={rubbish}
                                  alt="Delete"
                                />
                              </button>
                            </div>
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
