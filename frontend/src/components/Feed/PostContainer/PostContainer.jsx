import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useCurrentUserContext } from "../../../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function PostContainer({ groupId, categoryId }) {
  const [posts, setPosts] = useState([]);
  const [base, setBase] = useState(0);
  const { token } = useCurrentUserContext();

  useEffect(() => {
    setPosts([]);
    if (base > 0) {
      setBase(0);
    }
  }, [groupId, categoryId]);

  useEffect(() => {
    if (groupId === 0 && categoryId === 0) {
      fetch(`${backEnd}/api/posts/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setPosts((prev) => [...prev, ...result]);
        });
    } else if (groupId > 0 && categoryId === 0) {
      fetch(`${backEnd}/api/posts/group/${groupId}/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setPosts((prev) => [...prev, ...result]);
        });
    } else if (categoryId > 0) {
      fetch(`${backEnd}/api/posts/category/${categoryId}/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setPosts((prev) => [...prev, ...result]);
        });
    }
  }, [base, groupId, categoryId]);

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
