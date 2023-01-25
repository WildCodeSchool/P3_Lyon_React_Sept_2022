/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, Navbar, ProfileCard } from "../components";
import { useCurrentUserContext } from "../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [profileUser, setProfileUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [base, setBase] = useState(0);
  // const { refresh } = usePostUserContext();
  const { user_id } = useParams();
  const { user } = useCurrentUserContext();

  useEffect(() => {
    if (user_id) {
      fetch(`${backEnd}/api/users/${user_id}`)
        .then((response) => response.json())
        .then((result) => {
          setProfileUser(result);
        });
      fetch(`${backEnd}/api/myposts/user/${user_id}/limit/${base}`)
        .then((response) => response.json())
        .then((result) => {
          setMyPosts((prev) => [...prev, ...result]);
        });
    } else {
      fetch(`${backEnd}/api/users/${user.id}`)
        .then((response) => response.json())
        .then((result) => {
          setProfileUser(result);
        });
      fetch(`${backEnd}/api/myposts/user/${user.id}/limit/${base}`)
        .then((response) => response.json())
        .then((result) => {
          setMyPosts((prev) => [...prev, ...result]);
        });
    }
  }, [base, user_id]);
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

  return (
    <div className="bg-[#f6f6fe] overflow-x-hidden">
      {profileUser && (
        <div>
          <Navbar />
          <ProfileCard profileUser={profileUser} />
          <h1 className="text-primary text-center text-4xl mb-3">
            Publications
          </h1>
          <div>
            <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-6 md:grid md:grid-cols-2 md:gap-2">
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
