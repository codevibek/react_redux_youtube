import { Comment } from "@/app/[id]/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApis = createApi({
  reducerPath: "commentApis",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id: number) => `comments?postId=${id}`,
      providesTags: ["Comment"],
    }),
    addComment: builder.mutation({
      query: (comment: Partial<Comment>) => ({
        url: "comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
      query: (id: number) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    editComment: builder.mutation({
      query: (comment: Comment) => ({
        url: `comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentApis;
