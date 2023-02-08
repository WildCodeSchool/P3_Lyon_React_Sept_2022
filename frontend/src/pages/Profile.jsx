/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, Navbar, ProfileCard } from "../components";
import { useCurrentUserContext } from "../contexts/userContext";
import "../App.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [profileUser, setProfileUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [base, setBase] = useState(0);
  // const { refresh } = usePostUserContext();
  const { user_id } = useParams();
  const { user, token } = useCurrentUserContext();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (user_id) {
      fetch(`${backEnd}/api/users/${user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setProfileUser(result);
        });
      fetch(`${backEnd}/api/myposts/user/${user_id}/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setMyPosts((prev) => [...prev, ...result]);
        });
    } else {
      setProfileUser(user);
      fetch(`${backEnd}/api/myposts/user/${user.id}/limit/${base}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setMyPosts((prev) => [...prev, ...result]);
        });
    }
  }, [base, user_id, refresh]);
  // }, [refresh, user_id]);

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

  const deleteFromPostWithId = (idPost) => {
    const postIndex = myPosts.findIndex((post) => post.id === idPost);
    myPosts.splice(postIndex, 1);
    setMyPosts([...myPosts]);
  };
  const refreshPosts = () => {
    setBase(0);
    setMyPosts([]);
    setRefresh(!refresh);
  };

  return (
    <div className="bg-[#f6f6fe] md:overflow-y-hidden md:h-screen  ">
      {profileUser.id && (
        <div>
          <div className="md:sticky md:top-0 md:w-full md:z-10 md:bg-[#f6f6fe]">
            <Navbar />
          </div>
          <div className="md:flex md:max-h-screen ">
            <ProfileCard
              profileUser={profileUser}
              setProfileUser={setProfileUser}
              refreshPosts={refreshPosts}
            />
            <h1 className="text-primary text-center text-4xl mb-3 md:hidden">
              Publications
            </h1>
            <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-6 md:w-[130rem] md:mr-72 max-h-screen md:overflow-y-auto md:overflow-x-hidden md:rounded-lg  ">
              {myPosts
                .filter((posts) => profileUser.id === posts.user_id) // je filtre les publications de l'utilisateur pour les faire correspondre à l'id de l'utilisateur
                .map((post) => (
                  <Post
                    post={post}
                    key={post.id}
                    deleteFromPostWithId={deleteFromPostWithId}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
