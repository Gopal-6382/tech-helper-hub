"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { PostCard } from "@/frontend/features/posts/components/feed/post-card";
import { PostListProps } from "../../types/post.types";
import { PostViewTrigger } from "../actions/post-view-trigger";
import { ErrorState } from "@/frontend/components/feedback/error-state";

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
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUserId={currentUserId} />
      ))}
      {posts.map((post) => (
        <PostViewTrigger
          key={post.id}
          postId={post.id}
          onViewed={post.isViewed}
        />
      ))}
    </div>
  );
}
