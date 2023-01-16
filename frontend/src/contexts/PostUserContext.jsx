/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
  const [isGroup, setIsGroup] = useState(false);

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

  const posts = [
    {
      post_id: 1,
      title: "Organisation repas de Noël !",
      article:
        "You are my fire. The one desire. Believe when I say. I want it that way",
      image: "../assets/picture-post.jpg",
      category: "Communication Agence - Actualités",
      username: "Margaux Donova",
      avatar: "../assets/avatar-user.jpeg",
      user_id: 2,
    },
    {
      post_id: 2,
      title: "Vacances d'été",
      article:
        "Tell me why, ain't nothing but a heartache. Tell me why, ain't nothing but a mistake",
      image: "../assets/solar-groups.jpeg",
      category: "Prévention - Affichage réglementaire",
      username: "Michael Jackson",
      avatar: "../assets/user-avatar2.jpeg",
      user_id: 3,
    },
    {
      post_id: 3,
      title: "Joyeux anniversaire Margaux!",
      article:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.",
      image: "../assets/avatar-user.jpeg",
      category: "News",
      username: "Ryan Bidau",
      avatar: "../assets/my-avatar.jpeg",
      user_id: 1,
    },
    {
      post_id: 4,
      title: "Secret Santa",
      article: "Tell me why, I never wanna hear you say. I want it that way",
      image: "../assets/picture-post.jpg",
      category: "Communication Agence - Actualités",
      username: "Ryan Bidau",
      avatar: "../assets/my-avatar.jpeg",
      user_id: 1,
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
      value={{ users, posts, groupes, categories, isGroup, setIsGroup }}
    >
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
