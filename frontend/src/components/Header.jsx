import React from "react";
import { useCurrentUserContext } from "../contexts/userContext";

function Header() {
  const { user } = useCurrentUserContext();
  return (
    <div className="bg-background">
      <h1 className="text-primary text-center text-4xl mb-3">
        Enedis Val de France {user.firstname}
      </h1>
      <h2 className="text-primary text-center text-xl">Mes groupes</h2>
    </div>
  );
}

export default Header;
