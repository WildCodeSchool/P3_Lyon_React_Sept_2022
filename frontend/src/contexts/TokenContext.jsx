import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TokenContext = createContext();

export default TokenContext;

export function TokenContextProvider({ children }) {
  const navigate = useNavigate();
  function redirectIfDisconnected() {
    navigate("/");
    toast(" ✅ Session expirée !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  }

  return (
    <TokenContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ redirectIfDisconnected }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export const useTokenContext = () => useContext(TokenContext);
