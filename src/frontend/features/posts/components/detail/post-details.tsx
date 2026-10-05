"use client";

import type { Post } from "@/frontend/features/posts/types/post.types";
import { PostCard } from "../feed/post-card";

type PostDetailProps = {
  post: Post;
  currentUserId?: string;
};

export function PostDetail({ post, currentUserId }: PostDetailProps) {
  return (
    <div>
      <PostCard post={post} currentUserId={currentUserId} />
    </div>
  );
}
