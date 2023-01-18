import React, { useState } from "react";
import { useCurrentUserContext } from "../../../contexts/userContext";

function Comment() {
  const { user, post } = useCurrentUserContext();

  const [createComment, setCreateComment] = useState({
    content: "",
    user_id: "",
    post_id: "",
  });

  const onChange = (e) => {
    setCreateComment({
      ...createComment,
      content: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(createComment);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    if (
      createComment.content &&
      createComment.user_id &&
      createComment.post_id
    ) {
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(
        `http://localhost:5000/api/posts/${post.id}/comments`,
        requestOptions
      )
        .then((response) => response.text())
        .then((response) => {
          setCreateComment(response);
          console.warn(response);
        })
        .catch(console.error());
    }
  };
  return (
    <div className="w-full mt-6 ml-6 flex items-center justify-start pb-6">
      <img
        className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
        src={user.avatar}
        alt="My profile avatar"
      />
      <form onSubmit={(e) => onSubmit(e)} method="PUT">
        <input
          className="w-72 shadow-md rounded-xl py-2 pl-2 text-sm"
          type="text"
          name="comment"
          placeholder="Laissez un commentaire..."
          valeur={createComment.content}
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default Comment;
