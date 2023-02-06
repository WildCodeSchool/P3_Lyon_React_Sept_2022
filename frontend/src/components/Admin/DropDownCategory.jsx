import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import FlecheDownBlue from "../../assets/arrow-down-blue.png";
import { usePostUserContext } from "../../contexts/PostUserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DropDownCategory({ groupId, setCategoryId }) {
  const { categoryList } = usePostUserContext();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-between w-48 h-12 items-center text-primary font-[Enedis] bg-white text-xl	font-bold border px-8 mb-6 border-primary rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none">
          <div className="flex justify-between">
            Categories
            <img
              className="w-3 h-2 mt-3 ml-3 md:ml-8"
              src={FlecheDownBlue}
              alt="Arrow down"
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
        <Menu.Items className="absolute right-0 z-10 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categoryList
              .filter((category) => category.group_id === groupId)
              .map((category) => (
                <Menu.Item key={category.id}>
                  {({ active }) => (
                    <div
                      role="button"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => setCategoryId(category.id)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          // ...
                        } else if (e.key === "ArrowUp") {
                          // ...
                        }
                      }}
                      tabIndex={0}
                    >
                      {category.category_name}
                    </div>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDownCategory;
