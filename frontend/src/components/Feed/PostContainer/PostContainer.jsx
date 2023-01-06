import React from "react";
import Post from "./Post";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function PostContainer() {
  const { comments } = usePostUserContext();

  return (
    <div>
      {comments.map((comment) => (
        <Post comment={comment} />
      ))}
    </div>
  );
}

export default PostContainer;
