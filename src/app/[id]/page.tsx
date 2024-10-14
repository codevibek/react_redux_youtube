"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGetCommentsQuery } from "../store/apis/comments/api";

export interface Comment {
  id: number;
  text: string;
  postId: number;
}

const Comments = () => {
  const { id } = useParams();
  const { data: comments } = useGetCommentsQuery(Number(id));

  const [commentsData, setCommentsData] = React.useState<Comment[]>([]);

  useEffect(() => {
    if (comments) {
      setCommentsData(comments);
    }
  }, [comments]);
  return (
    <div>
      {commentsData?.map((comment: Comment) => (
        <div key={comment.id}>
          <h3>{comment.id}</h3>
          <h3>{comment.text}</h3>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comments;
