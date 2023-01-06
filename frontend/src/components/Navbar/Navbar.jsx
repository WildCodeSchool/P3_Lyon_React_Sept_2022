import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const message = "phjkljnlknlkn";
  return (
    <div>
      <div className="w-full pb-6 flex items-center justify-between">
        <Link to="/feed">
          <img
            className="bg-background w-32 h-16"
            src="./src/assets/logo-enedis.png"
            alt="Logo"
          />
        </Link>
        <div className="flex flex-end items-center">
          <div className="rounded-full w-10 h-10 mr-2 border-4 border-violet">
            <Link to="/profile" message={message}>
              <img
                src="./src/assets/my-avatar.jpeg"
                alt="My profile avatar"
                className="rounded-full"
              />
            </Link>
          </div>
          <Link to="/">
            <img
              className="w-6 h-6 mr-2"
              src="./src/assets/logout.png"
              alt="Logout"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
