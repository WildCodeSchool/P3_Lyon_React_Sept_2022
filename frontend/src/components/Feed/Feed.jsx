import React from "react";
import CreatePostContainer from "./CreatePostContainer/CreatePostContainer";
import PostContainer from "./PostContainer/PostContainer";

function Feed({ groupId, categoryId }) {
  return (
    <div>
      <CreatePostContainer />
      <PostContainer groupId={groupId} categoryId={categoryId} />
    </div>
  );
}

export default Feed;
