import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoEnedis from "../../assets/logo-enedis.png";
import logOut from "../../assets/logout.png";
import { useCurrentUserContext } from "../../contexts/userContext";
import { usePostUserContext } from "../../contexts/PostUserContext";
import avatar from "../../assets/my-avatar.jpeg";

function Navbar() {
  const { setCurrentUser } = useCurrentUserContext();
  const { users, setIsCategory } = usePostUserContext();

  useEffect(() => {
    setCurrentUser(users[0]);
  }, []);
  return (
    <div>
      <div className="w-full pb-6 flex items-center justify-between">
        <Link to="/feed">
          <button type="button" onClick={() => setIsCategory(false)}>
            <img className="w-32 h-16" src={logoEnedis} alt="Logo" />
          </button>
        </Link>
        <div className="flex flex-end items-center">
          <div className="rounded-full w-10 h-10 mr-2 border-4 border-violet">
            <Link to="/profile">
              <img
                src={avatar}
                alt="My profile avatar"
                className="rounded-full"
              />
            </Link>
          </div>
          <Link to="/">
            <img className="w-6 h-6 mr-2" src={logOut} alt="Logout" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
