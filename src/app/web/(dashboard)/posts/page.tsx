"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import { useAuth } from "@/frontend//context/auth-context";
import { usePosts } from "@/frontend/features/posts/hooks/posts/use-posts";
import { PostList } from "@/frontend/features/posts/components/feed/post-list";
import { PostViewTrigger } from "@/frontend/features/posts/components/actions/post-view-trigger";

export default function PostsPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = usePosts();

  const posts = data ?? [];
  const currentUserId = "ba1598d6-d817-4357-a01c-90b46d9d0103";

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Posts</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Ask questions, share problems, and help others.
          </p>
        </div>

        <Button variant="secondary">
          <Link href="/web/posts/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Link>
        </Button>
      </div>

      <PostList
        posts={posts}
        currentUserId={currentUserId}
        isLoading={isLoading}
        error={error}
      />
      {/* <PostViewTrigger postId={posts[0].id} /> */}
    </div>
  );
}
