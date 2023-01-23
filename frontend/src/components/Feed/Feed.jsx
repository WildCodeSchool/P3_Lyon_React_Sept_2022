import React from "react";
import CreatePostContainer from "./CreatePostContainer/CreatePostContainer";
import PostContainer from "./PostContainer/PostContainer";

function Feed() {
  return (
    <div>
      <CreatePostContainer />
      <PostContainer />
    </div>
  );
}

export default Feed;
