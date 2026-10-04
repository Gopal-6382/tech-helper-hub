"use client";

import { useEffect, useRef } from "react";

import { usePostView } from "@/frontend/features/posts/hooks/interactions/use-post-view";
import { PostViewTriggerProps } from "@/features/posts/types/post-action.types";

export function PostViewTrigger({ postId, onViewed }: PostViewTriggerProps) {
  const triggeredRef = useRef(false);
  const { mutate } = usePostView();

  useEffect(() => {
    if (!postId || triggeredRef.current) {
      return;
    }

    triggeredRef.current = true;

    mutate(postId, {
      onSuccess: (result) => {
        if (result.success && result.counted) {
          onViewed?.(result.viewCount);
        }
      },
      onError: () => {
        triggeredRef.current = false;
      },
    });
  }, [postId, mutate, onViewed]);

  return null;
}
