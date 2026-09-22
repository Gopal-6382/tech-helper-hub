"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import { usePosts } from "@/frontend/features/posts/hooks/use-posts";
import { PostList } from "@/frontend/features/posts/components/post-list";

export default function PostsPage() {
  const { data, isLoading, error } = usePosts();

  const posts = data ?? [];

  return (
    <div className="container mx-auto max-w-3xl space-y-6 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Posts</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Ask questions, share problems, and help others.
          </p>
        </div>

        <Button>
          <Link href="/web/posts/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Link>
        </Button>
      </div>

      <PostList posts={posts} isLoading={isLoading} error={error} />
    </div>
  );
}
