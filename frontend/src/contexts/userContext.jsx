import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CurrentUserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
