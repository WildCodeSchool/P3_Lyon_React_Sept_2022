import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import modifDot from "../../../assets/modifDot.png";
import deleteBtn from "../../../assets/deleteBtn.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownDeletePost({ handleDelete }) {
  const [modalDeletePost, setModalDeletePost] = useState(false);

  const handleModalDeletePost = () => {
    setModalDeletePost(!modalDeletePost);
  };
  return (
    <>
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
                        <button type="button" onClick={handleModalDeletePost}>
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
      {modalDeletePost && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-80 transition-opacity" />

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
                          Êtes vous certain de vouloir supprimer cette
                          publication ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#070D4F] px-4 py-3 items-center sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={handleModalDeletePost}
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
    </>
  );
}
