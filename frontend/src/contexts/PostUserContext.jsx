/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
// import React, { createContext, useState } from "react";

// const PostUserContext = createContext();

// export const PostUserContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState([]);
//   const [postUsers, setPostUsers] = useState([]);

//   return (
//     <PostUserContext.Provider
//       value={{ currentUser, setCurrentUser, postUsers, setPostUsers }}
//     >
//       {children}
//     </PostUserContext.Provider>
//   );
// };

// export default PostUserContext;

import React, { createContext, useContext } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
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

  const comments = [
    {
      comment_id: 1,
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
      comment_id: 2,
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
      comment_id: 3,
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
      comment_id: 4,
      title: "Secret Santa",
      article: "Tell me why, I never wanna hear you say. I want it that way",
      image: "../assets/picture-post.jpg",
      category: "Communication Agence - Actualités",
      username: "Ryan Bidau",
      avatar: "../assets/my-avatar.jpeg",
      user_id: 1,
    },
  ];

  return (
    <PostUserContext.Provider value={{ users, comments }}>
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
