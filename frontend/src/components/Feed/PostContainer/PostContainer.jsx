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
      });
  }, [base]);

  // function fetchPosts() {
  //   fetch(`http://localhost:5000/api/posts/limit/${base}`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setBase((prev) => prev + 5);
  //       setPosts((prev) => [...prev, ...result]);
  //     });
  // }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight - 100
    ) {
      setBase((prev) => prev + 5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* <button type="button" onClick={() => console.warn(posts)}>
        BUTTTOOOON
      </button>
      {/* <button type="button" onClick={fetchPosts}>
        Fetch
      </button>
      <button type="button" onClick={() => console.warn(base)}>
        Base
      </button> */}

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
