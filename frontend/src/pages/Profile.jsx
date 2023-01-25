/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Feed/PostContainer/Post";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [profileUser, setProfileUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const { refresh } = usePostUserContext();
  const { user_id } = useParams();
  const { user } = useCurrentUserContext();

  useEffect(() => {
    if (user_id) {
      fetch(`${backEnd}/api/users/${user_id}`)
        .then((response) => response.json())
        .then((result) => {
          setProfileUser(result);
        });
    } else {
      fetch(`${backEnd}/api/users/${user.id}`)
        .then((response) => response.json())
        .then((result) => {
          setProfileUser(result);
        });
    }

    fetch(`${backEnd}/api/myposts/user/${user_id}`)
      .then((response) => response.json())
      .then((result) => {
        setMyPosts(result);
      });
  }, [refresh, user_id]);

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
                  <Post post={post} key={post.id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
