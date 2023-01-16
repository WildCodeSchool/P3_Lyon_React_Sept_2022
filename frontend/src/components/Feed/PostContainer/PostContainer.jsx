import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        console.warn(result);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
