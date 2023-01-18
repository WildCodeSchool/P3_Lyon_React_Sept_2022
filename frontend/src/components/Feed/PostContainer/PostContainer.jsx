import React, { useEffect } from "react";
import Post from "./Post";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import { useCurrentUserContext } from "../../../contexts/userContext";

function PostContainer() {
  const { posts, setPosts, base, setBase, refresh } = usePostUserContext();
  const { token } = useCurrentUserContext();

  // const handleDeleteUser = async () => {
  //   fetch(http://localhost:5000/api/users/$%7Bid%7D, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: Bearer ${token},
  //       "Content-Type": "application/json",
  //     },

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/limit/${base}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setPosts((prev) => [...prev, ...result]);
        // console.warn("Result:", result);
        // console.warn("posts: ", posts);
        // console.warn("base: ", base);
      });
  }, [base, refresh]);

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
    <div className="md:ml-[-85%] md:w-[40vw] md:rounded-lg">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostContainer;
