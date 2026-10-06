"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { buttonVariants } from "@/frontend/components/ui/button";
import { cn } from "@/frontend/lib/utils";
import { Card, CardContent } from "@/frontend/components/ui/card";

import { useAuth } from "@/frontend/context/auth-context";
import { usePost } from "@/frontend/features/posts/hooks/posts/use-post";
import { PostDetail } from "@/frontend/features/posts/components/detail/post-details";
import { PostComments } from "@/frontend/features/posts/components/comments/post-comments";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);

  const { user, isInitialized } = useAuth();
  const { data: post, isLoading, error } = usePost(id);

  if (isLoading || !isInitialized) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <div className="flex justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <h1 className="text-xl font-semibold">Post not found</h1>

            <p className="text-sm text-muted-foreground">
              {error?.message ?? "The requested post could not be loaded."}
            </p>

            <Link
              href="/web/posts"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <ArrowLeft />
              Back to posts
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-6">
      <div className="space-y-6">
        <PostDetail
          post={post}
          currentUserId={user?.id}
        />

        <PostComments postId={post.id} />
      </div>
    </main>
  );
}