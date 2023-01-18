import React, { useEffect, useState } from "react";
import Post from "../components/Feed/PostContainer/Post";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";
// eslint-disable-next-line import/no-named-as-default
import EditPost from "../components/Feed/PostContainer/EditPost";
import { usePostUserContext } from "../contexts/PostUserContext";
import menuDots from "../assets/menu-dots.png";
import { useCurrentUserContext } from "../contexts/userContext";

function Profile() {
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const { refresh } = usePostUserContext();
  const { user } = useCurrentUserContext();

  useEffect(() => {
    fetch(`http://localhost:5000/api/myposts/limit/0"`)
      .then((response) => response.json())
      .then((result) => {
        setMyPosts(result);
        console.warn(result);
      });
  }, [refresh]);

  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal);
  };

  return (
    <div className="bg-[#f6f6fe] w-screen">
      {user && (
        <div>
          <Navbar />
          <ProfileCard user={user} />
          <h1 className="text-primary text-center text-4xl mb-3">
            Publications
          </h1>
          <div>
            <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-6">
              <div className="flex justify-end pt-2">
                <button onClick={() => handleEditPost()} type="button">
                  <img className="h-8" src={menuDots} alt="Menu" />
                </button>
              </div>
              {editPostMenu ? (
                <div className="origin-top-right absolute right-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    onClick={() => handleEditPostModal()}
                    className="text-black p-4 flex"
                    type="button"
                  >
                    <img
                      className="h-5 w-5"
                      src="./src/assets/edit.png"
                      alt="Edit"
                    />
                    <span className="pl-3">Modifier</span>
                  </button>
                  {editPostModal ? (
                    <EditPost
                      editPostModal={editPostModal}
                      setEditPostModal={setEditPostModal}
                      handleEditPostModal={handleEditPostModal}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {myPosts
                .filter((mesPosts) => user.id === mesPosts.user_id)
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
