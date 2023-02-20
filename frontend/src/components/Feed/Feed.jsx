import React from "react";
import { CreatePostContainer, PostContainer } from "..";

function Feed({ groupId, categoryId }) {
  return (
    <div>
      <CreatePostContainer />
      <PostContainer groupId={groupId} categoryId={categoryId} />
    </div>
  );
}

export default Feed;
