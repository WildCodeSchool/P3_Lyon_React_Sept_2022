import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoEnedis from "../../assets/logo-enedis.png";
import logOut from "../../assets/logout.png";
import { useCurrentUserContext } from "../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Navbar({ setGroupId, setCategoryId }) {
  const { user, setUser } = useCurrentUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    setUser({});
    navigate("/");
  };

  const toFeedOrAdmin = () => {
    if (location.pathname === "/feed") {
      setGroupId(0);
      setCategoryId(0);
    } else navigate("/feed");
  };

  return (
    <div>
      <div className="w-full pb-6 flex items-center justify-between md:shadow-md">
        <button type="button" onClick={toFeedOrAdmin}>
          <img
            className="w-32 h-16 md:w-48 md:h-20 md:mb-[-26px]"
            src={logoEnedis}
            alt="Logo"
          />
        </button>

        <div className="flex flex-end items-center md:mr-5">
          <div className="rounded-full md:mr-5 ">
            <Link to="/profile">
              <img
                src={`${backEnd}/uploads/${user.avatar}`}
                alt="My profile avatar"
                className="rounded-full object-cover w-10 h-10 mr-2 border-4 border-violet md:h-14 md:w-14 md:mr-0 md:mt-2 md:-mb-2"
              />
            </Link>
          </div>
          <button type="button" onClick={onClick}>
            <img
              className="w-6 h-6 mr-2 md:h-10 md:w-10 md:-mb-2"
              src={logOut}
              alt="Log out"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
