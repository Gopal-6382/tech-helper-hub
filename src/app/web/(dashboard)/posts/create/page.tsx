"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { PostForm } from "@/frontend/features/posts/components/form/posts-form";

export default function CreatePostPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-6">
      <div className="space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>

          <p className="text-sm text-muted-foreground">
            Describe your problem clearly so others can help.
          </p>
        </header>

        {/* Back Navigation */}
        <Button variant="outline" render={<Link href="/web/posts" />}>
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Button>

        {/* Form */}
        <PostForm />
      </div>
    </main>
  );
}
