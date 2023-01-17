/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
  const [isGroup, setIsGroup] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [valueSelectedCategory, setValueSelectedCategory] = useState("");
  const [valueSelectedGroup, setValueSelectedGroup] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [posts, setPosts] = useState([]);

  const users = [
    {
      user_id: 1,
      name: "Ryan Bidau",
      job: "Project Manager",
      team: "Commercial",
      avatar: "my-avatar.jpeg",
    },
    {
      user_id: 2,
      name: "Margaux Donova",
      job: "Chargée de Communication",
      team: "Communication / Marketing",
      avatar: "avatar-user.jpeg",
    },
    {
      user_id: 3,
      name: "Michael Jackson",
      job: "UX Designer",
      team: "Web Services",
      avatar: "user-avatar2.jpeg",
    },
  ];

  const groupes = [
    { id: 1, groupname: "Communication Agence", imageurl: "" },
    { id: 2, groupname: "Métier", imageurl: "" },
    { id: 3, groupname: "Prévention", imageurl: "" },
    { id: 4, groupname: "Entre nous", imageurl: "" },
    { id: 5, groupname: "Clients", imageurl: "" },
  ];

  const categories = [
    { id: 1, categoryname: "ComAgnc 1", imageurl: "", group_id: 1 },
    { id: 2, categoryname: "ComAgnc 2", imageurl: "", group_id: 1 },
    { id: 3, categoryname: "ComAgnc 3", imageurl: "", group_id: 1 },
    { id: 4, categoryname: "Métier 1", imageurl: "", group_id: 2 },
    { id: 5, categoryname: "Métier 2", imageurl: "", group_id: 2 },
    { id: 6, categoryname: "Métier 3", imageurl: "", group_id: 2 },
    { id: 7, categoryname: "Prev 1", imageurl: "", group_id: 3 },
    { id: 8, categoryname: "Prev 2", imageurl: "", group_id: 3 },
    { id: 9, categoryname: "Prev 3", imageurl: "", group_id: 3 },
    { id: 10, categoryname: "Nous 1", imageurl: "", group_id: 4 },
    { id: 11, categoryname: "Nous 2", imageurl: "", group_id: 4 },
    { id: 12, categoryname: "Nous 3", imageurl: "", group_id: 4 },
    { id: 13, categoryname: "Client 1", imageurl: "", group_id: 5 },
    { id: 14, categoryname: "Client 2", imageurl: "", group_id: 5 },
    { id: 15, categoryname: "Client 3", imageurl: "", group_id: 5 },
  ];

  return (
    <PostUserContext.Provider
      value={{
        users,
        posts,
        setPosts,
        groupes,
        categories,
        isGroup,
        setIsGroup,
        groupList,
        setGroupList,
        categoryList,
        setCategoryList,
        showCreatePost,
        setShowCreatePost,
        valueSelectedCategory,
        setValueSelectedCategory,
        setValueSelectedGroup,
        valueSelectedGroup,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
