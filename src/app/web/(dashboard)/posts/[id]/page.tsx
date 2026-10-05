"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent } from "@/frontend/components/ui/card";

import { usePost } from "@/frontend/features/posts/hooks/posts/use-post";
import { PostCard } from "@/frontend/features/posts/components/feed/post-card";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);

  const { data: post, isLoading, error } = usePost(id);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl py-10">
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto max-w-3xl py-10">
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <h1 className="text-xl font-semibold">Post not found</h1>

            <p className="text-sm text-muted-foreground">
              {error?.message ?? "The requested post could not be loaded."}
            </p>
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <Link href="/web/posts">Back to posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <PostCard
        currentUserId="ba1598d6-d817-4357-a01c-90b46d9d0103"
        onReport={() => {}}
        post={post}
      />
    </div>
  );
}
