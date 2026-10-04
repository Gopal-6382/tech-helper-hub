"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/frontend/components/ui/card";
import type {
  Post,
  PostCardProps,
  PostHeaderProps,
} from "@/frontend/features/posts/types/post.types";

import { PostActions } from "@/frontend/features/posts/components/actions/post-actions";
import { PostImages } from "@/frontend/features/posts/components/media/post-images";
import { PostMenu } from "@/frontend/features/posts/components/actions/post-menu";
import { PostStatusBadge } from "@/frontend/features/posts/components/shared/post-status-badge";
import { DeletePostDialog } from "@/frontend/features/posts/components/actions/delete-post-dialog";

export function PostCard({
  post,
  currentUserId,
  onReport,
  viewed = false,
}: PostCardProps) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const postUrl = `/web/posts/${post.id}`;
  const images = post.images ?? [];
  const isOwner = Boolean(currentUserId && currentUserId === post.authorId);

  return (
    <>
      <Card className="animate-in fade-in slide-in-from-bottom-4 zoom-in-95 overflow-hidden border-border/60 bg-background shadow-sm duration-500 transition-shadow hover:shadow-lg">
        <CardContent className="space-y-4 p-4">
          <PostHeader
            post={post}
            isOwner={isOwner}
            onEdit={() => router.push(`${postUrl}/edit`)}
            onDelete={() => setIsDeleteOpen(true)}
            onReport={onReport ? () => onReport(post.id) : undefined}
          />

          <PostMeta post={post} />

          <Link href={postUrl}>
            <h3 className="text-xl font-semibold tracking-tight hover:underline">
              {post.title}
            </h3>
          </Link>

          <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {post.content}
          </p>

          {images.length > 0 && (
            <div className="relative h-56 w-full overflow-hidden rounded-xl bg-muted">
              <PostImages images={images} title={post.title} />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/70 to-transparent p-3">
                {post.author.profile?.city && (
                  <span className="flex items-center gap-1 text-xs text-white">
                    <MapPin className="h-3.5 w-3.5" />
                    {post.author.profile.city}
                  </span>
                )}
              </div>
            </div>
          )}

          <PostActions
            postId={post.id}
            likeCount={post._count?.likes ?? 0}
            commentCount={post._count?.comments ?? 0}
            saveCount={post._count?.savedBy ?? 0}
            isLiked={post.isLiked ?? false}
            isSaved={post.isSaved ?? false}
            viewCount={post.viewCount}
            viewed={viewed}
            onComment={() => router.push(postUrl)}
          />
        </CardContent>
      </Card>

      <DeletePostDialog
        postId={post.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}

function PostHeader({
  post,
  isOwner,
  onEdit,
  onDelete,
  onReport,
}: PostHeaderProps) {
  const { author } = post;

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name ?? "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
              {(author.name ?? "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {author.name ?? "Unknown user"}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <PostMenu
        canEdit={isOwner}
        canDelete={isOwner}
        onEdit={onEdit}
        onDelete={onDelete}
        onReport={onReport}
      />
    </div>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PostStatusBadge status={post.status} />

      {post.category?.name && (
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
          {post.category.name}
        </span>
      )}
    </div>
  );
}