// src/frontend/components/posts/post-detail.tsx

"use client";

import Image from "next/image";
import {
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";

import { usePost } from "../hooks/use-posts";

type Props = {
  postId: string;
};

export function PostDetail({ postId }: Props) {
  const {
    data: post,
    isPending,
    isError,
  } = usePost(postId);

  if (isPending) {
    return (
      <div className="mx-auto h-64 w-full max-w-3xl animate-pulse rounded-xl border bg-muted/50" />
    );
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Post could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full max-w-3xl rounded-xl border bg-background">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
            {post.author.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium">
              {post.author.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {post.category.name}
              {post.city
                ? ` · ${post.city}`
                : ""}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              {post.title}
            </h1>

            <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
              {post.status}
            </span>
          </div>

          <p className="mt-5 whitespace-pre-wrap text-sm leading-7">
            {post.content}
          </p>
        </div>

        {post.images.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {post.images.map((image: string) => (
              <div
                key={image}
                className="relative aspect-video overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-5 border-t pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart size={18} />
            {post._count.likes}
          </span>

          <span className="flex items-center gap-1.5">
            <MessageCircle size={18} />
            {post._count.comments}
          </span>

          <span>{post.viewCount} views</span>

          <button
            type="button"
            className="ml-auto"
            aria-label="Save post"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}