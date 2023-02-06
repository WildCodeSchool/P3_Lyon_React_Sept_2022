import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import modifDot from "../../assets/modifDot.png";
import edit from "../../assets/edit.png";
import deleteBtn from "../../assets/deleteBtn.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownEditUser({
  card,
  toggleRefresh,
  deleteUserGroup,
  deleteButton,
  groupId,
  addUserInGroup,
  deleteUserList,
}) {
  const handleDelete = (id) => {
    axios
      .delete(`${backEnd}/api/users/${id}`)
      .then(() => {
        deleteUserList();
        toggleRefresh();
        toast.success(" Utilisateur supprimé !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Menu>
      <div>
        <Menu.Button>
          <div>
            <img className="w-2 h-6 ml-28" src={modifDot} alt="" />
          </div>
        </Menu.Button>
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
        <div className="md:mb-[10vh]">
          <Menu.Items className="absolute right-0 z-10 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/adminUser/${card.id}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    <div className="flex">
                      <img className="h-3 w-3 mr-2 mt-1" src={edit} alt="" />{" "}
                      <p>Modifier</p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    <div className="flex">
                      <img
                        className="h-3 w-3 mr-2 mt-1"
                        src={deleteBtn}
                        alt=""
                      />{" "}
                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </Menu.Item>
              {deleteButton > 0 && (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      <div className="flex">
                        <img
                          className="h-3 w-3 mr-2 mt-1"
                          src={deleteBtn}
                          alt=""
                        />
                        <button
                          type="button"
                          className="text-start"
                          onClick={() =>
                            deleteUserGroup(deleteButton, card.user_id)
                          }
                        >
                          Supprimer l'utilisateur du groupe
                        </button>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              )}
              {groupId > 0 && (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      <div className="flex">
                        <img
                          className="h-3 w-3 mr-2 mt-1"
                          src={deleteBtn}
                          alt=""
                        />{" "}
                        <button
                          type="button"
                          onClick={() => addUserInGroup(card.id)}
                        >
                          Ajouter au groupe
                        </button>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}
