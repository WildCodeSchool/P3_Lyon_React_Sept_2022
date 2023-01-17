import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostContainer() {
  const [posts, setPosts] = useState([]);
  const [base, setBase] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/limit/${base}`)
      .then((response) => response.json())
      .then((result) => {
        setPosts((prev) => [...prev, ...result]);
        console.warn(base);
      });
  }, [base]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight - 300
    ) {
      setBase((prev) => prev + 5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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
