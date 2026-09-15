// src/frontend/components/posts/post-list.tsx

"use client";

import { PostCard } from "./post-card";
import { usePosts } from "../hooks/use-posts";

export function PostList() {
  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = usePosts();

  if (isPending) {
    return (
      <div className="space-y-4" aria-busy="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl border bg-muted/50"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Unable to load posts.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h2 className="font-semibold">
          No posts yet
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Be the first to share a problem.
        </p>
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