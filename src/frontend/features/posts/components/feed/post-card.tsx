"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/frontend/components/ui/card";

import type {
  PostCardProps,
  PostHeaderProps,
} from "@/frontend/features/posts/types/post.types";

import { PostActions } from "@/frontend/features/posts/components/actions/post-actions";
import { PostImages } from "@/frontend/features/posts/components/media/post-images";
import { PostMenu } from "@/frontend/features/posts/components/actions/post-menu";
import { DeletePostDialog } from "@/frontend/features/posts/components/actions/delete-post-dialog";
import { ReportPostDialog } from "@/frontend/features/posts/components/report/report-post-dialog";
import { UpdatePostStatusDialog } from "../actions/UpdatePostStatusDialog";
import { PostMeta } from "../shared/post-meta";

export function PostCard({ post, currentUserId }: PostCardProps) {
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const postUrl = `/web/posts/${post.id}`;
  const images = post.images ?? [];

  const isOwner =
    currentUserId !== undefined && currentUserId === post.authorId;

  return (
    <>
      <Card className="overflow-hidden border-border/60 bg-background shadow-sm transition-shadow hover:shadow-lg">
        <CardContent className="space-y-4 p-4">
          <PostHeader
            post={post}
            isOwner={isOwner}
            onEdit={() => router.push(`${postUrl}/edit`)}
            onDelete={() => setIsDeleteOpen(true)}
            onUpdateStatus={() => setIsStatusOpen(true)}
            onReport={!isOwner ? () => setIsReportOpen(true) : undefined}
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
            <div className="relative w-full overflow-hidden rounded-xl bg-muted">
              <PostImages images={images} title={post.title} />

              {post.author.profile?.city && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3">
                  <span className="flex items-center gap-1 text-xs text-white">
                    <MapPin className="size-3.5" />
                    {post.author.profile.city}
                  </span>
                </div>
              )}
            </div>
          )}

          <PostActions
            postId={post.id}
            likeCount={post._count?.likes ?? 0}
            commentCount={post._count?.comments ?? 0}
            saveCount={post._count?.savedBy ?? 0}
            isLiked={post.isLiked}
            isSaved={post.isSaved}
            viewCount={post.viewCount}
            viewed={post.isViewed}
            onComment={() => router.push(postUrl)}
          />
        </CardContent>
      </Card>

      <DeletePostDialog
        postId={post.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <UpdatePostStatusDialog
        postId={post.id}
        currentStatus={post.status}
        open={isStatusOpen}
        onOpenChange={setIsStatusOpen}
      />

      <ReportPostDialog
        postId={post.id}
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
      />
    </>
  );
}

function PostHeader({
  post,
  isOwner,
  onEdit,
  onDelete,
  onUpdateStatus,
  onReport,
}: PostHeaderProps) {
  const { author } = post;

  const avatarFallback = (author.name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name ?? "User"}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm font-semibold">
              {avatarFallback}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {author.name ?? "Unknown user"}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <PostMenu
        canEdit={isOwner}
        canDelete={isOwner}
        canUpdateStatus={isOwner}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdateStatus={onUpdateStatus}
        onReport={onReport}
      />
    </div>
  );
}
