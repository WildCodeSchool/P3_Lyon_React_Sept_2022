import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../contexts/userContext";

function Avatar() {
  const { user } = useCurrentUserContext();
  return (
    <Link to="/profile">
      <img src={user.avatar} alt="My profile avatar" className="rounded-full" />
    </Link>
  );
}

export default Avatar;
