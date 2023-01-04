/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";

function GroupSelector() {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  const [showMenu4, setShowMenu4] = useState(false);
  const [showMenu5, setShowMenu5] = useState(false);
  return (
    <div>
      <div className=" w-full">
        <div className="dropdown inline-block relative w-full">
          <div className="flex justify-between">
            <button
              onClick={() => setShowMenu1(!showMenu1)}
              className="bg-primary text-white text-2xl font-['Enedis'] font-bold h-10 w-full"
            >
              Communication Agence
            </button>
          </div>
          {showMenu1 ? (
            <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
              <li className="cursor-pointer  hover:bg-primary">One</li>
              <li className="cursor-pointer  hover:bg-primary">Two</li>
              <li className="cursor-pointer  hover:bg-primary">
                Three is the magic number
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" w-full">
        <div className="dropdown inline-block relative w-full">
          <div className="flex justify-between">
            <button
              onClick={() => setShowMenu2(!showMenu2)}
              className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
            >
              Métier
            </button>
          </div>
          {showMenu2 ? (
            <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
              <li>One</li>
              <li>Two</li>
              <li>Three is the magic number</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" w-full">
        <div className="dropdown inline-block relative w-full">
          <div className="flex justify-between">
            <button
              onClick={() => setShowMenu3(!showMenu3)}
              className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
            >
              Prévention
            </button>
          </div>
          {showMenu3 ? (
            <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
              <li>One</li>
              <li>Two</li>
              <li>Three is the magic number</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" w-full">
        <div className="dropdown inline-block relative w-full">
          <div className="flex justify-between">
            <button
              onClick={() => setShowMenu4(!showMenu4)}
              className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
            >
              Clients
            </button>
          </div>
          {showMenu4 ? (
            <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
              <li>One</li>
              <li>Two</li>
              <li>Three is the magic number</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" w-full">
        <div className="dropdown inline-block relative w-full">
          <div className="flex justify-between">
            <button
              onClick={() => setShowMenu5(!showMenu5)}
              className=" text-black text-2xl font-['Enedis'] font-semibold h-10 rounded w-full"
            >
              Entre Nous
            </button>
          </div>
          {showMenu5 ? (
            <ul className="dropdown-menu text-xl font-semibold text-gray-700 pt-1 shadow-md">
              <li>One</li>
              <li>Two</li>
              <li>Three is the magic number</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupSelector;
