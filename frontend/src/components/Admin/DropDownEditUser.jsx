import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
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
}) {
  const handleDelete = (id) => {
    axios
      .delete(`${backEnd}/api/users/${id}`)
      .then((response) => {
        console.warn(response.data);
        toggleRefresh();
        console.warn("Utilisateur supprimé");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <div className="flex justify-between">
            <img className="w-2 h-6 ml-32 " src={modifDot} alt="" />
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
                    <img className="h-3 w-3 mr-2 mt-1" src={deleteBtn} alt="" />{" "}
                    <button type="button" onClick={() => handleDelete(card.id)}>
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
                      />{" "}
                      <button
                        type="button"
                        onClick={() => deleteUserGroup(deleteButton, card.id)}
                      >
                        Supprimer un utilisateur du groupe
                      </button>
                    </div>
                  </div>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
