"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "./store/features/posts/postData";

export interface Post {
  id: number;
  title: string;
  views: number;
}
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const posts = useSelector(fetchPosts);

  const [postsData, setPostsData] = useState<Post[]>([]);

  const getPostsData = async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    dispatch(getPosts(data));
  };
  useEffect(() => {
    if (posts) {
      setPostsData(posts);
    }
  }, [posts]);
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <div>
      {postsData.map((post: Post) => (
        <div key={post.id} onClick={() => router.push(`/${post.id}`)}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}
