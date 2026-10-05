"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { PostCard } from "@/frontend/features/posts/components/feed/post-card";
import { PostListProps } from "../../types/post.types";

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
          <p className="text-sm text-destructive">
            {error.message || "Failed to load posts."}
          </p>
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
    </div>
  );
}
