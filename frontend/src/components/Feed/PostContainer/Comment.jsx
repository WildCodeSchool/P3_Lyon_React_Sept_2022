import React, { useState } from "react";
import { useCurrentUserContext } from "../../../contexts/userContext";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import send from "../../../assets/send.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Comment({ postId }) {
  const { user } = useCurrentUserContext();
  const { refreshComment, setRefreshComment } = usePostUserContext();

  const [createComment, setCreateComment] = useState({
    content: "",
    user_id: user?.id,
    post_id: postId,
  });

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
      fetch(`${backEnd}/api/posts/${postId}/comments`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          setRefreshComment(!refreshComment);
          // setNumberComments(numberComments + 1);
          const form = document.getElementsByName("form")[0];
          form.reset();
        })
        .catch(console.error);
    }
  };

  return (
    <div className="w-full mt-6 flex items-center pl-2 pb-4 md:items-start">
      <img
        className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
        src={user.avatar}
        alt="My profile avatar"
      />
      <form
        onSubmit={onSubmit}
        name="form"
        className="flex justify-around items-center shadow-md rounded-xl"
      >
        <input
          className="w-60 py-2 pl-2 text-sm"
          type="text"
          name="content"
          placeholder="Laissez un commentaire..."
          onChange={onChange}
        />
        <button type="button" className="py-3 w-8" onClick={onSubmit}>
          <img className="w-4 h-4" src={send} alt="Send comment" />
        </button>
      </form>
    </div>
  );
}

export default Comment;
