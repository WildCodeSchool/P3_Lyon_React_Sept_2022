import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoEnedis from "../../assets/logo-enedis.png";
import logOut from "../../assets/logout.png";
import { useCurrentUserContext } from "../../contexts/userContext";
import { usePostUserContext } from "../../contexts/PostUserContext";

function Navbar() {
  const { user, setUser } = useCurrentUserContext();
  const { setIsGroup } = usePostUserContext();

  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    setUser({});
    navigate("/");
  };

  return (
    <div>
      <div className="w-full pb-6 flex items-center justify-between">
        <Link to={user.is_admin ? "/admin" : "/feed"}>
          <button type="button" onClick={() => setIsGroup(false)}>
            <img className="w-32 h-16" src={logoEnedis} alt="Logo" />
          </button>
        </Link>
        <div className="flex flex-end items-center">
          <div className="rounded-full">
            <Link to="/profile">
              <img
                src={user.avatar}
                alt="My profile avatar"
                className="rounded-full w-10 h-10 mr-2 border-4 border-violet"
              />
            </Link>
          </div>
          <button type="button" onClick={onClick}>
            <img className="w-6 h-6 mr-2" src={logOut} alt="Log out" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
