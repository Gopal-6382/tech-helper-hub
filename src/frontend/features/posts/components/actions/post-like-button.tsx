"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { usePostLike } from "@/frontend/features/posts/hooks/interactions/use-post-like";

export function PostLikeButton({
  postId,
  initialLiked = false,
  initialLikeCount = 0,
}: PostLikeButtonProps) {
  const likeMutation = usePostLike();

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [tap, setTap] = useState(0);

useEffect(() => {
  if (typeof initialLiked === "boolean") {
    setLiked(initialLiked);
  }
}, [initialLiked]);
  const handleLike = () => {
    if (likeMutation.isPending) return;

    const nextLiked = !liked;

    setTap((value) => value + 1);
    setLiked(nextLiked);

    setLikeCount((count) => (nextLiked ? count + 1 : Math.max(count - 1, 0)));

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
            return;
          }

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
      className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
        liked
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <Heart
        key={`like-${tap}`}
        className={`h-6 w-6 transition-transform group-active:scale-90 ${
          liked ? "fill-current" : ""
        } ${tap > 0 ? "animate-in zoom-in-50 fade-in duration-300" : ""}`}
      />

      <span>{likeCount}</span>
    </button>
  );
}
