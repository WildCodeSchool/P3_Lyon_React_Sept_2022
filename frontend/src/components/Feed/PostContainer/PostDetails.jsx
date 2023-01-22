import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function PostDetails() {
  const [comments, setComments] = useState([]);
  const { refreshComment } = usePostUserContext();
  const [postDetails, setPostDetails] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      });
  }, [refreshComment]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${postId}`)
      .then((response) => response.json())
      .then((result) => {
        setPostDetails(result);
      });
  }, [postId]);

  return (
    <div className="bg-white h-screen w-screen">
      <button type="button">
        <img className="mr-80 mt-6" src="../src/assets/croix.png" alt="Close" />
      </button>
      <div className="flex flex-row items-center py-6 px-10 md:mx-auto">
        <img
          className="rounded-full w-24 mr-6 border-4 border-violet"
          src={postDetails.avatar}
          alt="User avatar"
        />
        <h2 className=" md:block text-primary text-3xl">
          {postDetails.firstname} {postDetails.lastname}
        </h2>
      </div>
      <div className="flex justify-around md:mx-auto ">
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px]">
          {postDetails.group_name}
        </div>
        <div className="border border-primary bg-transparent hover:bg-primary hover:text-white text-primary mt-5 py-2 px-2 max-w-fit rounded-[5px] md:ml-5">
          {postDetails.category_name}
        </div>
      </div>

      <div className="flex justify-center text-center px-4 md:flex md:flex-col md:mx-auto md:w-full ">
        <h2 className="text-3xl text-left md:ml-6 md:text-center">
          {postDetails.title}
        </h2>
      </div>
      <img
        className="mt-10 md:h-[40%] md:mx-auto"
        src={`http://localhost:5000/uploads/${postDetails.post_image}`}
        alt="Post"
      />
      <p className="bg-white text-md p-8 md:mx-auto">{postDetails.content}</p>
      <h2 className="font-bold text-center">Ouvrir le pdf :</h2>
      <div className="flex items-center justify-center text-center pb-2">
        <div
          className="w-2/5 flex flex-col justify-center items-center shadow-md rounded-xl py-4 text-sm
        placeholder-gray-500 focus:placeholder-gray-400"
        >
          <img className="h-8 w-8 pr-1" src="../src/assets/pdf.png" alt="PDF" />
          participants.pdf
        </div>
      </div>
      <div className="w-full mt-6 flex flex-col items-center px-6">
        {comments.map((comment) => (
          <div
            key={`${postDetails.id}${comment.id}`}
            comment={comment}
            className="flex justify-center items-center pb-2"
          >
            <img
              className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
              src={comment.avatar}
              alt="My profile avatar"
            />
            <div className="w-72 shadow-md rounded-xl py-2 pl-2 text-sm">
              {comment.content}
            </div>
          </div>
        ))}
      </div>

      <Comment postId={postDetails.id} />
    </div>
  );
}

export default PostDetails;
