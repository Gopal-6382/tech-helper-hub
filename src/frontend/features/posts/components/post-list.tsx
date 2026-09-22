"use client";

import type { Post } from "@/frontend/features/posts/types/post.types";
import { PostCard } from "./post-card";

type PostListProps = {
  posts: Post[];
  isLoading?: boolean;
  error?: Error | null;
};

export function PostList({
  posts,
  isLoading = false,
  error = null,
}: PostListProps) {
  if (isLoading) {
    return <div className="py-8 text-center">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="py-8 text-center text-destructive">{error.message}</div>
    );
  }

  if (!posts.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No posts found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
