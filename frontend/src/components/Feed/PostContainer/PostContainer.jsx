import React, { useEffect } from "react";
import Post from "./Post";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function PostContainer() {
  const { posts, setPosts, base, setBase } = usePostUserContext();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/limit/${base}`)
      .then((response) => response.json())
      .then((result) => {
        setPosts((prev) => [...prev, ...result]);
        console.warn("Result:", result);
        console.warn("posts: ", posts);
        console.warn("base: ", base);
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
      document.documentElement.scrollHeight
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
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
