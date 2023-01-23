import React, { createContext, useContext, useState } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
  const [groupId, setGroupId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [valueSelectedCategory, setValueSelectedCategory] = useState("");
  const [valueSelectedGroup, setValueSelectedGroup] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [base, setBase] = useState(0);
  const [refreshComment, setRefreshComment] = useState(false);

  function handleReset() {
    console.warn("it works");
    setPosts([]);
    setBase(0);
    setRefresh(!refresh);
    setValueSelectedGroup("");
    setValueSelectedCategory("");
    setGroupId(0);
    setCategoryId(0);
  }

  return (
    <PostUserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        posts,
        setPosts,
        groupId,
        setGroupId,
        groupList,
        setGroupList,
        categoryList,
        categoryId,
        setCategoryId,
        setCategoryList,
        showCreatePost,
        setShowCreatePost,
        valueSelectedCategory,
        setValueSelectedCategory,
        setValueSelectedGroup,
        valueSelectedGroup,
        refresh,
        setRefresh,
        base,
        setBase,
        handleReset,
        refreshComment,
        setRefreshComment,
      }}
    >
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
