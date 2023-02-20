import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "./Comment";
import { usePostUserContext } from "../../../contexts/PostUserContext";
import { useCurrentUserContext } from "../../../contexts/userContext";
import pdf from "../../../assets/pdf.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

const date = new Date();

const currentDate = `${date.getFullYear()}${`0${date.getMonth()}${1}`.slice(
  -2
)}${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;

function PostDetails({ numberComments, setNumberComments }) {
  const [comments, setComments] = useState([]);
  const { refreshComment } = usePostUserContext();
  const [postDetails, setPostDetails] = useState({});
  const { postId } = useParams();
  const { token } = useCurrentUserContext();

  useEffect(() => {
    fetch(`${backEnd}/api/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      });
  }, [refreshComment]);

  useEffect(() => {
    fetch(`${backEnd}/api/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setPostDetails(result);
      });
  }, [postId]);

  return (
    <div className="bg-white md:bg-[#F6F6Fe] h-screen w-screen overflow-x-hidden ">
      <div>
        <Link to="/feed">
          <img
            className="mt-2 md:mt-6 md:ml-4"
            src="../src/assets/croix.png"
            alt="Close"
          />
        </Link>
        <div className="flex flex-row items-center py-2 md:py-2 px-10 ">
          <div className="flex md:flex md:ml-[200px]">
            {postDetails.image && (
              <img
                className="rounded-full w-24 h-24 md:w-22 md:h-22 mr-6 border-4 border-violet"
                src={`${backEnd}/uploads/${postDetails.avatar}`}
                alt="User avatar"
              />
            )}

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
              {postDetails.post_date && (
                <h3 className="text-gray-400 font-light">
                  {postDetails.post_date.slice(0, 10).split("-").join("") ===
                    currentDate.slice(0, 8) &&
                    `${postDetails.post_date.slice(11, 16)}`}
                  {currentDate.slice(0, 8) -
                    postDetails.post_date.slice(0, 10).split("-").join("") ===
                    1 && "Hier"}
                  {currentDate.slice(0, 8) -
                    postDetails.post_date.slice(0, 10).split("-").join("") >
                    1 &&
                    `${postDetails.post_date
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}`}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 m-auto md:w-[70%] md:flex-row md:bg-white md:py-6 md:px-6 md:item-center md:rounded-xl flex flex-col items-start text-sm">
        <div className="md:flex-col md:flex md:justify-center">
          <h2 className="text-2xl px-2 md:ml-[2vw] md:mb-6 text-start">
            {postDetails.title}
          </h2>
          <p className="text-md py-2 px-2 pb-4 md:ml-6 md:w-[80%] md:h-[70%] ">
            {postDetails.content}
          </p>
        </div>
        {postDetails.post_image &&
          (postDetails.post_image.slice(-4) === ".pdf" ? (
            <div className="flex flex-row w-6/12 pl-3 py-6 ml-3 shadow-md rounded-xl">
              <img className="w-5 h-5 mr-2" src={pdf} alt="pdf" />
              <a
                href={`${backEnd}/uploads/${postDetails.post_image}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-md "
              >
                Visualiser le PDF
              </a>
            </div>
          ) : (
            <img
              className="mt-3 md:h-[40%] md:w-[50%] md:border-violet md:rounded"
              src={`${backEnd}/uploads/${postDetails.post_image}`}
              alt="Post"
            />
          ))}
      </div>
      <div className="">
        <div className="mt-4 md:flex md:flex-col pl-2">
          {comments.length > 0 &&
            comments.map((comment) => (
              <div
                key={`${postDetails.id} + ${comment.id}`}
                comment={comment}
                className="flex pl-2 md:my-1 md:mx-[14vw] pb-2"
              >
                <img
                  className="rounded-full w-10 h-10 mr-3 border-4 border-violet"
                  src={`${backEnd}/uploads/${comment.avatar}`}
                  alt="My profile avatar"
                />
                <div className="w-72 shadow-md rounded-xl py-2 pl-2 text-sm md:bg-white">
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
    </div>
  );
}

export default PostDetails;
