"use client";

import { MessageCircle, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/frontend/components/ui/card";

import { useComments } from "@/frontend/features/posts/hooks/comments/use-comments";
import { PostCommentItem } from "./post-comment-item";
import { PostCommentForm } from "../form/post-comment-form";

type PostCommentsProps = {
  postId: string;
};

export function PostComments({ postId }: PostCommentsProps) {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useComments(postId);

  return (
    <Card className=" overflow-hidden">
      <CardHeader className="border-b px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageCircle className="size-4" />
          Comments
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-150 overflow-y-auto">
          {isLoading && (
            <div className="flex justify-center py-10">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}

          {error && (
            <div className="px-4 py-10 text-center text-sm text-destructive">
              {error.message || "Failed to load comments."}
            </div>
          )}

          {!isLoading && !error && comments.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No comments yet. Be the first to comment.
            </div>
          )}

          {!isLoading && !error && comments.length > 0 && (
            <div className="divide-y">
              {comments.map((comment) => (
                <PostCommentItem
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <PostCommentForm postId={postId} />
        </div>
      </CardContent>
    </Card>
  );
}