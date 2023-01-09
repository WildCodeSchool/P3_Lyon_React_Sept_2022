import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
