import React from "react";
import PostContainer from "../components/Feed/PostContainer/PostContainer";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";

function Profile() {
  return (
    <div>
      <Navbar />
      <ProfileCard />
      <h1 className="text-primary text-center text-4xl mb-3">Publications</h1>
      <PostContainer />
    </div>
  );
}

export default Profile;
