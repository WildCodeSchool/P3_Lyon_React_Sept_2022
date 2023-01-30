import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "./Comment";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import pdf from "../../../assets/pdf.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function PostDetails({ numberComments, setNumberComments }) {
  const [comments, setComments] = useState([]);
  const { refreshComment } = usePostUserContext();
  const [postDetails, setPostDetails] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    fetch(`${backEnd}/api/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      });
  }, [refreshComment]);

  useEffect(() => {
    fetch(`${backEnd}/api/posts/${postId}`)
      .then((response) => response.json())
      .then((result) => {
        setPostDetails(result);
      });
  }, [postId]);

  return (
    <div className="bg-white h-screen w-screen overflow-x-hidden">
      <div>
        <Link to="/feed">
          <img
            className="mt-2 md:mt-6 md:ml-4"
            src="../src/assets/croix.png"
            alt="Close"
          />
        </Link>
        <div className="flex flex-row items-center py-6 px-10 md:mx-auto">
          <img
            className="rounded-full w-24 h-24 mr-6 border-4 border-violet"
            src={`${backEnd}/uploads/${postDetails.avatar}`}
            alt="User avatar"
          />
          <div className="flex flex-col justify-start items-start">
            <h2 className=" md:block text-primary text-3xl mb-2">
              {postDetails.firstname} {postDetails.lastname}
            </h2>

            <h3 className="font-light text-primary">
              {postDetails.group_name}
            </h3>
            <h3 className="font-light text-primary">
              {postDetails.category_name}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto flex flex-col items-start text-sm">
        <h2 className="text-2xl px-2 md:ml-6 md:text-center">
          {postDetails.title}
        </h2>
        <p className="text-md py-2 px-2 pb-4 md:ml-6 md:text-center">
          {postDetails.content}
        </p>

        {postDetails.post_image &&
          (postDetails.post_image.slice(-4) === ".pdf" ? (
            <div className="flex flex-row w-6/12 pl-3 py-6 ml-3 shadow-md rounded-xl">
              <img className="w-5 h-5 mr-2" src={pdf} alt="pdf" />
              <a
                href={`${backEnd}/uploads/${PostDetails.post_image}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-md"
              >
                Visualiser le PDF
              </a>
            </div>
          ) : (
            <img
              className="mt-3 md:h-[40%] md:mx-auto"
              src={`${backEnd}/uploads/${postDetails.post_image}`}
              alt="Post"
            />
          ))}
      </div>

      <div className="w-full mt-6 flex flex-col pl-2 md:items-start">
        {comments.map((comment) => (
          <div
            key={`${postDetails.id} + ${comment.id}`}
            comment={comment}
            className="flex pl-2 items-center pb-2"
          >
            <img
              className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
              src={`${backEnd}/uploads/${comment.avatar}`}
              alt="My profile avatar"
            />
            <div className="w-72 shadow-md rounded-xl py-2 pl-2 text-sm">
              {comment.content}
            </div>
          </div>
        ))}

        <Comment
          postId={postId}
          numberComments={numberComments}
          setNumberComments={setNumberComments}
        />
      </div>
    </div>
  );
}

export default PostDetails;
