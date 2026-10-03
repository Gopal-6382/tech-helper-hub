"use client";

import { useEffect, useRef } from "react";

import { usePostView } from "@/frontend/features/posts/hooks/interactions/use-post-view";

type PostViewTriggerProps = {
  postId: string;
};

export function PostViewTrigger({
  postId,
}: PostViewTriggerProps) {
  const viewedPostIdRef = useRef<string | null>(null);
  const { mutate } = usePostView();

  useEffect(() => {
    if (!postId) {
      return;
    }

    // Prevent the same mounted component from sending
    // the same post view more than once.
    if (viewedPostIdRef.current === postId) {
      return;
    }

    viewedPostIdRef.current = postId;

    mutate(postId);
  }, [postId, mutate]);

  return null;
}