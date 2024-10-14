"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export interface Comment {
  id: number;
  text: string;
}

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        `http://localhost:3000/comments?posts=${id}`
      );
      const data = await response.json();
      setComments(data);
    };
    getComments();
  });
  return (
    <div>
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          <h3>{comment.id}</h3>
          <h3>{comment.text}</h3><br/>
        </div>
      ))}
    </div>
  );
};

export default Comments;
