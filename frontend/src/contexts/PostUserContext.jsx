/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
  const [isGroup, setIsGroup] = useState(false);
  const [valueGroupe, setValueGroupe] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [valueSelectedCategory, setValueSelectedCategory] = useState("");
  const [valueSelectedGroup, setValueSelectedGroup] = useState("");
  const [userCard, setUserCard] = useState([]);

  return (
    <PostUserContext.Provider
      value={{
        isGroup,
        setIsGroup,
        valueGroupe,
        setValueGroupe,
        valueCategory,
        setValueCategory,
        showCreatePost,
        setShowCreatePost,
        valueSelectedCategory,
        setValueSelectedCategory,
        setValueSelectedGroup,
        valueSelectedGroup,
        userCard,
        setUserCard,
      }}
    >
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
