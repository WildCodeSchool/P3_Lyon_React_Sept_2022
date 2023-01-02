import React from "react";
import { Link } from "react-router-dom";

function Avatar() {
  return (
    <Link to="/profile">
      <img
        src="./src/assets/my-avatar.jpeg"
        alt="My profile avatar"
        className="rounded-full"
      />
    </Link>
  );
}

export default Avatar;
