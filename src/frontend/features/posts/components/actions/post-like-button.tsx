"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { usePostLike } from "@/frontend/features/posts/hooks/interactions/use-post-like";
import type { PostLikeButtonProps } from "@/frontend/features/posts/types/post-action.types";

export function PostLikeButton({
  postId,
  initialLiked = false,
  initialLikeCount = 0,
}: PostLikeButtonProps) {
  const likeMutation = usePostLike();

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [tap, setTap] = useState(0);

  const handleLike = () => {
    if (likeMutation.isPending) return;

    const nextLiked = !liked;

    setLiked(nextLiked);
    setLikeCount((count) => (nextLiked ? count + 1 : Math.max(count - 1, 0)));
    setTap((value) => value + 1);

    likeMutation.mutate(
      {
        postId,
        liked: nextLiked,
      },
      {
        onError: (error) => {
          const message =
            error instanceof Error ? error.message.toLowerCase() : "";

          if (message.includes("already liked")) {
            setLiked(true);
            setLikeCount((count) => Math.max(count - 1, 0));
            return;
          }

          // Real failure: roll back both state and count.
          setLiked(!nextLiked);
          setLikeCount((count) =>
            nextLiked ? Math.max(count - 1, 0) : count + 1,
          );
        },
      },
    );
  };

  return (
    <button
      type="button"
      disabled={likeMutation.isPending}
      onClick={handleLike}
      aria-label={liked ? "Unlike post" : "Like post"}
      className={[
        "group flex items-center gap-2 rounded-full px-3 py-2",
        "text-sm font-semibold transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        liked
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      ].join(" ")}
    >
      <Heart
        key={`like-${tap}`}
        className={[
          "size-6 transition-transform",
          "group-active:scale-90",
          liked ? "fill-current" : "",
          tap > 0 ? "animate-in zoom-in-50 fade-in duration-300" : "",
        ].join(" ")}
      />

      <span>{likeCount}</span>
    </button>
  );
}
