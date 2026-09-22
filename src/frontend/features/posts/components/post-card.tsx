"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/frontend/components/ui/card";

import type { Post } from "@/frontend/features/posts/types/post.types";

import { PostActions } from "./post-actions";
import { PostImages } from "./post-images";
import { PostMenu } from "./post-menu";
import { PostStatusBadge } from "./post-status-badge";
import { PostViewTrigger } from "./post-view-trigger";
import { DeletePostDialog } from "./delete-post-dialog";

type PostCardProps = {
  post: Post;
  currentUserId?: string;
  onReport?: (postId: string) => void;
};

export function PostCard({ post, currentUserId, onReport }: PostCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const postWithExtras = post as Post & {
    isLiked?: boolean;
    isSaved?: boolean;
    author?: {
      id: string;
      name?: string | null;
      avatar?: string | null;
    } | null;
    category?: {
      id: string;
      name: string;
    } | null;
    _count?: {
      likes?: number;
      comments?: number;
    };
  };

  const isOwner = Boolean(currentUserId) && currentUserId === post.authorId;

  const likeCount = postWithExtras._count?.likes ?? 0;

  const commentCount = postWithExtras._count?.comments ?? 0;

  const createdDate = new Date(post.createdAt);

  return (
    <>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {postWithExtras.author?.avatar ? (
                  <Image
                    src={postWithExtras.author.avatar}
                    alt={postWithExtras.author.name ?? "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
                    {(postWithExtras.author?.name ?? "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {postWithExtras.author?.name ?? "Unknown user"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(createdDate, {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <PostMenu
              canEdit={isOwner}
              canDelete={isOwner}
              onEdit={() => {
                window.location.href = `/posts/${post.id}/edit`;
              }}
              onDelete={() => setDeleteOpen(true)}
              onReport={onReport ? () => onReport(post.id) : undefined}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PostStatusBadge status={post.status} />

            {postWithExtras.category?.name && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                {postWithExtras.category.name}
              </span>
            )}
          </div>

          <Link href={`/posts/${post.id}`}>
            <h3 className="text-xl font-semibold tracking-tight hover:underline">
              {post.title}
            </h3>
          </Link>

          <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {post.content}
          </p>

          <PostImages images={post.images} title={post.title} />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {post.city ? (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {post.city}
              </span>
            ) : (
              <span />
            )}

            <span>{post.viewCount} views</span>
          </div>

          <PostActions
            postId={post.id}
            likeCount={likeCount}
            commentCount={commentCount}
            isLiked={postWithExtras.isLiked}
            isSaved={postWithExtras.isSaved}
            onComment={() => {
              window.location.href = `/posts/${post.id}`;
            }}
          />

          <PostViewTrigger postId={post.id} />
        </CardContent>
      </Card>

      <DeletePostDialog
        postId={post.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
