"use client";

import { useEffect, useRef } from "react";

import { usePostView } from "@/frontend/features/posts/hooks/use-post-view";

type PostViewTriggerProps = {
  postId: string;
};

export function PostViewTrigger({ postId }: PostViewTriggerProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const viewedRef = useRef(false);

  const viewMutation = usePostView();

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !postId || viewedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;

          viewMutation.mutate(postId);

          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [postId, viewMutation]);

  return <div ref={elementRef} aria-hidden="true" className="h-px w-full" />;
}
