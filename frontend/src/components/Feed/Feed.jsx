import React from "react";
import Avatar from "../Navbar/Avatar";
import CreatePostContainer from "./CreatePostContainer/CreatePostContainer";
import PostContainer from "./PostContainer/PostContainer";

function Feed() {
  return (
    <div>
      <Avatar />
      <CreatePostContainer />
      <PostContainer />
    </div>
  );
}

export default Feed;
