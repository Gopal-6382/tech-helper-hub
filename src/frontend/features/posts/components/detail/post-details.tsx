"use client";

import type { Post } from "@/frontend/features/posts/types/post.types";
import { PostViewTrigger } from "@/frontend/features/posts/components/detail/post-view-trigger";
import { PostList } from "../feed/post-list";

type PostDetailProps = {
  post: Post;
};

export function PostDetail({ post }: PostDetailProps) {
  return (
    <>
      <PostViewTrigger postId={post.id} />

      {/* Post detail UI here */}
      <PostList posts={[post]} />
    </>
  );
}
