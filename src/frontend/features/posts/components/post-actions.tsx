"use client";

import { Bookmark, Heart, MessageCircle } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import { usePostLike } from "@/frontend/features/posts/hooks/use-post-like";
import { usePostSave } from "@/frontend/features/posts/hooks/use-post-save";

import { PostShareDialog } from "./post-share-dialog";

type PostActionsProps = {
  postId: string;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onComment?: () => void;
};

export function PostActions({
  postId,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  isSaved = false,
  onComment,
}: PostActionsProps) {
  const likeMutation = usePostLike();
  const saveMutation = usePostSave();

  const handleLike = () => {
    if (likeMutation.isPending) {
      return;
    }

    likeMutation.mutate({
      postId,
      liked: isLiked,
    });
  };

  const handleSave = () => {
    if (saveMutation.isPending) {
      return;
    }

    saveMutation.mutate({
      postId,
      saved: isSaved,
    });
  };

  return (
    <div className="flex items-center justify-between border-t pt-3">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={likeMutation.isPending}
          onClick={handleLike}
        >
          <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          {likeCount}
        </Button>

        <Button type="button" variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="mr-1 h-4 w-4" />
          {commentCount}
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={saveMutation.isPending}
          onClick={handleSave}
          aria-label={isSaved ? "Unsave post" : "Save post"}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </Button>

        <PostShareDialog postId={postId} />
      </div>
    </div>
  );
}
