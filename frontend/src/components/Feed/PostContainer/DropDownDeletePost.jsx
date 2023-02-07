import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import modifDot from "../../../assets/modifDot.png";
import deleteBtn from "../../../assets/deleteBtn.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownDeletePost({ handleDelete }) {
  return (
    <Menu>
      <div>
        <Menu.Button>
          <div>
            <img
              className="w-8 h-8 mt-2 ml:32 md:ml-40"
              src={modifDot}
              alt="Menu dots"
            />
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
        <div>
          <Menu.Items className="absolute right-0 z-10 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
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
                        alt="Delete"
                      />{" "}
                      <button type="button" onClick={handleDelete}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
}
