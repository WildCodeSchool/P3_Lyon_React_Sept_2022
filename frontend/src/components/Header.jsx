import React from "react";
import { usePostUserContext } from "../contexts/PostUserContext";

function Header() {
  const { currentUser } = usePostUserContext();

  return (
    <div className="bg-background">
      <h1 className="text-primary text-center text-4xl mb-3">
        Enedis Val de France and {currentUser}
      </h1>
      <h2 className="text-primary text-center text-xl">Mes groupes</h2>
    </div>
  );
}

export default Header;
