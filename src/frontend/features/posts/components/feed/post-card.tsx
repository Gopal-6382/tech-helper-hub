"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/frontend/components/ui/card";

import type { PostCardProps } from "@/frontend/features/posts/types/post.types";

import { PostActions } from "@/frontend/features/posts/components/actions/post-actions";
import { PostImages } from "@/frontend/features/posts/components/media/post-images";
import { DeletePostDialog } from "@/frontend/features/posts/components/actions/delete-post-dialog";
import { ReportPostDialog } from "@/frontend/features/posts/components/report/report-post-dialog";
import { UpdatePostStatusDialog } from "../actions/update-post-status-dialog";
import { PostMeta } from "../shared/post-meta";
import { PostHeader } from "../detail/post-header";

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
      <Card className="w-full overflow-hidden border-border/60 bg-background shadow-sm transition-shadow hover:shadow-lg">
        <CardContent className="space-y-4 p-3 sm:p-4">
          <PostHeader
            post={post}
            isOwner={isOwner}
            onEdit={() => router.push(`${postUrl}/edit`)}
            onDelete={() => setIsDeleteOpen(true)}
            onUpdateStatus={() => setIsStatusOpen(true)}
            onReport={!isOwner ? () => setIsReportOpen(true) : undefined}
          />

          <PostMeta post={post} />

          <Link href={postUrl} className="block min-w-0">
            <h3 className="wrap-break-word text-lg font-semibold tracking-tight hover:underline sm:text-xl">
              {post.title}
            </h3>
          </Link>

          <p className="wrap-break-word line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {post.content}
          </p>

          {images.length > 0 && (
            <div className="relative w-full overflow-hidden rounded-xl bg-muted">
              <PostImages images={images} title={post.title} />
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
            city={post.author.profile?.city as string}
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
