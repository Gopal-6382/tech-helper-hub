"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { ErrorState } from "@/frontend/components/feedback/error-state";
import { PostCard } from "@/frontend/features/posts/components/feed/post-card";
import type { PostListProps } from "../../types/post.types";
import { PostViewTrigger } from "../actions/post-view-trigger";

export function PostList({
  posts,
  currentUserId,
  isLoading = false,
  error = null,
}: PostListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <ErrorState title="Failed to load posts" message={error.message} />
        </CardContent>
      </Card>
    );
  }

  if (!posts.length) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          <h3 className="font-semibold">No posts found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no problem posts to display.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="min-w-0">
            <PostCard post={post} currentUserId={currentUserId} />
            <PostViewTrigger postId={post.id} onViewed={post.isViewed} />
          </div>
        ))}
      </div>
    </div>
  );
}
