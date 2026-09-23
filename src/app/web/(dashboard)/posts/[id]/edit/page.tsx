"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent } from "@/frontend/components/ui/card";

import { usePost } from "@/frontend/features/posts/hooks/use-post";
import { PostForm } from "@/frontend/features/posts/components/posts-form";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditPostPage({ params }: EditPostPageProps) {
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

            <Button>
              <Link href="/posts">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to posts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl space-y-6 py-6">
      <Button variant="ghost">
        <Link href={`/posts/${post.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to post
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your problem post.
        </p>
      </div>

      <PostForm />
    </div>
  );
}
