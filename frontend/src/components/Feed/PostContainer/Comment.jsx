import React, { useState } from "react";
import { useCurrentUserContext } from "../../../contexts/userContext";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function Comment() {
  const { user, post } = useCurrentUserContext();
  const { refresh, setRefresh } = usePostUserContext();

  const [createComment, setCreateComment] = useState("");

  const onChange = (e) => {
    setCreateComment({
      ...createComment,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      content: "",
      user_id: user?.id,
      post_id: post?.id,
    });

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
          setRefresh(!refresh);
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
