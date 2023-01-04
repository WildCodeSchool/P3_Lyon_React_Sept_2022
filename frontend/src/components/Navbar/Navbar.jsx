import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="w-full pb-6 flex items-center justify-between">
        <img
          className="bg-background w-32 h-16"
          src="./src/assets/logo-enedis.png"
          alt="Logo"
        />{" "}
        <div className="flex flex-end items-center">
          <img
            className="rounded-full w-10 h-10 mr-2 border-4 border-violet"
            src="./src/assets/my-avatar.jpeg"
            alt="My profile avatar"
          />
          <Link to="/connexion">
            <img
              className="w-6 h-6 mr-2"
              src="./src/assets/logout.png"
              alt="Log out"
            />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
