import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import HeaderAdmin from "./HeaderAdmin";
import editbtn from "../../assets/editbtn.png";
import rubbish from "../../assets/deleteBtn.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminEspace() {
  const [groupList, setGroupList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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
    <div>
      <Navbar />
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-10 border-black">
        <h3>Gérer les groupes et les catégories</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          type="button"
          className="w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
        >
          Ajouter un nouveau groupe
        </button>
        <button
          type="button"
          className="w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
        >
          Ajouter un nouvelle catégorie
        </button>
      </div>
      <div className="flex justify-center text-center mb-6">
        <h1 className=" w-3/4 border rounded-md">
          ICI, UNE BARRE DE RECHERCHE
        </h1>
      </div>
      <div className="flex flex-col items-center w-screen">
        {groupList.map((group) => (
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
