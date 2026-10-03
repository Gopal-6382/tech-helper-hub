"use client";

import { useState } from "react";
import { Bookmark, Eye, Heart, MessageCircle } from "lucide-react";

import { usePostLike } from "@/frontend/features/posts/hooks/interactions/use-post-like";
import { usePostSave } from "@/frontend/features/posts/hooks/interactions/use-post-save";

import { PostShareDialog } from "@/frontend/features/posts/components/actions/post-share-dialog";

type PostActionsProps = {
  postId: string;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onComment?: () => void;
  viewCount?: number;
};

export function PostActions({
  postId,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  isSaved = false,
  onComment,
  viewCount = 0,
}: PostActionsProps) {
  const likeMutation = usePostLike();
  const saveMutation = usePostSave();

  const [likeTap, setLikeTap] = useState(0);
  const [saveTap, setSaveTap] = useState(0);

  const handleLike = () => {
    if (likeMutation.isPending) return;

    setLikeTap((value) => value + 1);
    likeMutation.mutate({
      postId,
      liked: isLiked,
    });
  };

  const handleSave = () => {
    if (saveMutation.isPending) return;

    setSaveTap((value) => value + 1);
    saveMutation.mutate({
      postId,
      saved: isSaved,
    });
  };

  return (
    <div className="flex items-center justify-between border-t border-border/60 pt-3">
      <div className="flex items-center gap-1">
        {/* Like */}
        <button
          type="button"
          disabled={likeMutation.isPending}
          onClick={handleLike}
          className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
            isLiked
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          <Heart
            key={`like-${likeTap}`}
            className={`h-6 w-6 transition-transform group-active:scale-90 ${
              isLiked ? "fill-current" : ""
            } ${likeTap > 0 ? "animate-in zoom-in-50 fade-in duration-300" : ""}`}
          />
          <span>{likeCount}</span>
        </button>

        {/* Comment */}
        <button
          type="button"
          onClick={onComment}
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span>{commentCount}</span>
        </button>

        {/* Views */}
        <span className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground">
          <Eye className="h-6 w-6" />
          <span>{viewCount}</span>
        </span>
      </div>

      <div className="flex items-center gap-1">
        {/* Save */}
        <button
          type="button"
          disabled={saveMutation.isPending}
          onClick={handleSave}
          aria-label={isSaved ? "Unsave post" : "Save post"}
          className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
            isSaved
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          <Bookmark
            key={`save-${saveTap}`}
            className={`h-6 w-6 transition-transform group-active:scale-90 ${
              isSaved ? "fill-current" : ""
            } ${
              saveTap > 0
                ? "animate-in slide-in-from-bottom-2 zoom-in-75 fade-in duration-300"
                : ""
            }`}
          />
          <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
        </button>

        {/* Share */}
        <PostShareDialog postId={postId} />
      </div>
    </div>
  );
}
