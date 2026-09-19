// src/frontend/components/posts/post-card.tsx

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

import type { Post } from "../types/post.types";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border bg-background">
      <div className="p-4">
        <div className="flex items-center gap-3">
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold"
            >
              {post.author.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{post.author.name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {post.category.name}
              {post.city ? ` · ${post.city}` : ""}
            </p>
          </div>

          <span className="ml-auto rounded-full bg-muted px-2 py-1 text-xs">
            {post.status}
          </span>
        </div>

        <Link href={`/web/posts/${post.id}`} className="mt-4 block">
          <h2 className="text-base font-semibold">{post.title}</h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.content}
          </p>
        </Link>

        {post.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {post.images.slice(0, 4).map((image) => (
              <div
                key={image}
                className="relative aspect-video overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart size={17} />
            {post._count.likes}
          </span>

          <span className="flex items-center gap-1.5">
            <MessageCircle size={17} />
            {post._count.comments}
          </span>

          <span>{post.viewCount} views</span>

          <button
            type="button"
            aria-label="Save post"
            className="ml-auto rounded-md p-1.5 hover:bg-muted"
          >
            <Bookmark size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
