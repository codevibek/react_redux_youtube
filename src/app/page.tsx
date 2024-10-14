"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Post {
  id: number;
  title: string;
  views: number;
}
export default function Home() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  });
  return (
    <div>
      {posts.map((post: Post) => (
        <div key={post.id} onClick={() => router.push(`/${post.id}`)}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}
