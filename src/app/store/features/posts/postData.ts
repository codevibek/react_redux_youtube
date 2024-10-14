import { Post } from "@/app/page";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface PostState {
  postData: Post[];
}

const initialState: PostState = {
  postData: [],
};

export const postData = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.postData = action.payload;
    },
    clearPosts: (state) => {
      state.postData = [];
    },
  },
});

export const { getPosts, clearPosts } = postData.actions;
export const fetchPosts = (state: RootState) => state.post.postData;

export default postData.reducer;
