import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostContainer() {
  const [posts, setPosts] = useState([]);
  const [base, setBase] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/limit/${base}`)
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        setBase(0);
        console.warn(result);
      });
  }, [base]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
