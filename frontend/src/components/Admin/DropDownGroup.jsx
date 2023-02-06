import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import FlecheDownBlue from "../../assets/arrow-down-blue.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DropDownGroup({ setGroupId }) {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/groups")
      .then((response) => response.json())
      .then((result) => {
        setGroupList(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-between w-[40vw] h-12 items-center text-primary font-[Enedis] bg-white text-xl	font-bold border p-1 px-8 mb-6 border-primary rounded-3xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <div className="flex justify-between">
            Groupes
            <img className="w-3 h-2 mt-3 ml-3" src={FlecheDownBlue} alt="" />
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
        <Menu.Items className="absolute left-0 z-10 mt-0 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {groupList.map((group) => (
              <Menu.Item key={group.id}>
                {({ active }) => (
                  <div
                    role="button"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => setGroupId(group.id)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        // ...
                      } else if (e.key === "ArrowUp") {
                        // ...
                      }
                    }}
                    tabIndex={0}
                  >
                    {group.group_name}
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

export default DropDownGroup;
