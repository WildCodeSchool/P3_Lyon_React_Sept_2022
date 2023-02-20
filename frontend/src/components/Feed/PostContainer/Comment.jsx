import React, { useState } from "react";
import { useCurrentUserContext } from "../../../contexts/userContext";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import send from "../../../assets/send.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Comment({ postId }) {
  const { user, token } = useCurrentUserContext();
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

    const body = JSON.stringify(createComment);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="w-full mt-6 md:mt-0 flex items-center md:rounded-xl pl-2 pb-4 md:ml-[14vw]">
      <img
        className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
        src={`${backEnd}/uploads/${user.avatar}`}
        alt="My profile avatar"
      />
      <form
        onSubmit={onSubmit}
        name="form"
        className="flex justify-around items-center shadow-md rounded-xl md:bg-white"
      >
        <input
          className="w-60 md:w-[50vw] md:rounded-lg py-2 pl-2 text-sm"
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
