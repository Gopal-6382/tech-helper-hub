"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/frontend/components/ui/button";
import { cn } from "@/frontend/lib/utils";

import { useAuth } from "@/frontend/context/auth-context";
import { usePosts } from "@/frontend/features/posts/hooks/posts/use-posts";
import { PostList } from "@/frontend/features/posts/components/feed/post-list";

export default function PostsPage() {
  const { user, isInitialized } = useAuth();
  const { data, isLoading, error } = usePosts();

  const posts = data ?? [];
  const currentUserId = user?.id;

  if (!isInitialized) {
    return null;
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-6">
      <div className="space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Problem Posts</h1>

            <p className="text-sm text-muted-foreground">
              Ask questions, share problems, and help others.
            </p>
          </div>

          <Link
            href="/web/posts/create"
            className={buttonVariants({
              variant: "default",
              size: "default",
            })}
          >
            <Plus className="size-4 text-primary-foreground" />
            <span className=" text-primary-foreground"> Create Post</span>
          </Link>
        </header>

        <PostList
          posts={posts}
          currentUserId={currentUserId}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
