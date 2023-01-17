import React, { useEffect } from "react";
import Post from "./Post";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function PostContainer() {
  const { posts, setPosts } = usePostUserContext();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/limit/2")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        console.warn(result);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
