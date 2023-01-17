/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});
  const [token, setToken] = useLocalStorage("token", "");

  const [currentUser, setCurrentUser] = useState([]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CurrentUserContext.Provider
      value={{ user, setUser, token, setToken, currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
