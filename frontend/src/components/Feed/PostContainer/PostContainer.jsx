import React, { useEffect } from "react";
import Post from "./Post";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function PostContainer() {
  const { refresh, posts, setPosts } = usePostUserContext();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/limit/0`)
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        console.warn(result);
      });
  }, [refresh]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
