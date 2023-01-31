import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Avatar() {
  const { user } = useCurrentUserContext();
  return (
    <Link to="/profile">
      <img
        src={`${backEnd}/uploads/${user.avatar}`}
        alt="My profile avatar"
        className="rounded-full object-cover w-24 h-24 border-4 border-violet mr-5 "
      />
    </Link>
  );
}

export default Avatar;
