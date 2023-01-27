import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/userContext";

function Avatar() {
  const { user } = useCurrentUserContext();
  return (
    <Link to="/profile">
      <img
        src={user.avatar}
        alt="My profile avatar"
        className="rounded-full object-cover w-24 h-24 border-4 border-violet mr-5 "
      />
    </Link>
  );
}

export default Avatar;
