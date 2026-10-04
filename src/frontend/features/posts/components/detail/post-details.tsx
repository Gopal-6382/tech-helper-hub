"use client";

import { useState } from "react";

import type { Post } from "@/frontend/features/posts/types/post.types";

import { PostViewTrigger } from "@/frontend/features/posts/components/actions/post-view-trigger";
import { PostViewCount } from "@/frontend/features/posts/components/actions/post-view-count";

type PostDetailProps = {
  post: Post;
};

export function PostDetail({ post }: PostDetailProps) {
  const [viewCount, setViewCount] = useState(post.viewCount);
  const [viewed, setViewed] = useState(false);

  return (
    <div>
      <PostViewTrigger
        postId={post.id}
        onViewed={(newViewCount) => {
          setViewCount(newViewCount);
          setViewed(true);
        }}
      />

      {/* Your actual detail UI */}

      <PostViewCount count={viewCount} viewed={viewed} />
    </div>
  );
}