"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import { PostForm } from "@/frontend/features/posts/components/posts-form";

export default function CreatePostPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-6 py-6">
      <Button variant="ghost">
        <Link href="/web  /posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Describe your problem clearly so others can help.
        </p>
      </div>

      <PostForm />
    </div>
  );
}
