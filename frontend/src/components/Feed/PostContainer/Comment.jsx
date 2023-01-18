import React from "react";
import { useCurrentUserContext } from "../../../contexts/userContext";

function Comment() {
  const { user } = useCurrentUserContext();
  return (
    <div className="w-full mt-6 flex items-center justify-between pb-6">
      <img
        className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
        src={user.avatar}
        alt="My profile avatar"
      />
      <input
        className="w-11/12 shadow-md rounded-xl py-2 pl-2 text-sm"
        type="text"
        valeur=""
        placeholder="Laissez un commentaire..."
      />
    </div>
  );
}

export default Comment;
