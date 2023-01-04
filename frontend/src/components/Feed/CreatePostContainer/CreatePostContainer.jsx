import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Navbar/Avatar";

function CreatePostContainer() {
  return (
    <div>
      <div className="bg-white w-full shadow-md rounded-t-sm	border-t border-gray-100 mt-10 flex items-center justify-center p-6">
        <div className="div-avatar rounded-full w-24 mr-2 border-4 border-violet">
          <Avatar />
        </div>

        <div className="border border-primary w-5/6 rounded-xl h-10 pt-2">
          <span className="ml-2 text-gray-400">
            <Link to="/createPost">Votre publication...</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreatePostContainer;
