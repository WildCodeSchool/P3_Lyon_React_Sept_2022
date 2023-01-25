import React from "react";

function Header({ darkMode }) {
  return (
    <div className="md:mt-16 rounded-md">
      <h1
        className={`${
          darkMode
            ? "text-white text-center text-4xl mb-3"
            : " text-primary text-center text-4xl mb-3"
        }`}
      >
        Notitia
      </h1>
    </div>
  );
}

export default Header;
