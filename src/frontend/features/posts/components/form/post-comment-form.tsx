"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { Textarea } from "@/frontend/components/ui/textarea";

import { useCreateComment } from "@/frontend/features/posts/hooks/comments/use-create-comment";

type PostCommentFormProps = {
  postId: string;
};

export function PostCommentForm({ postId }: PostCommentFormProps) {
  const [content, setContent] = useState("");

  const createCommentMutation = useCreateComment();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    createCommentMutation.mutate(
      {
        postId,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write a comment..."
        rows={3}
        disabled={createCommentMutation.isPending}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={createCommentMutation.isPending || !content.trim()}
        >
          {createCommentMutation.isPending && (
            <Loader2 className="size-4 animate-spin" />
          )}

          {createCommentMutation.isPending ? "Commenting..." : "Comment"}
        </Button>
      </div>

      {createCommentMutation.isError && (
        <p className="text-sm text-destructive">
          {createCommentMutation.error.message || "Failed to create comment."}
        </p>
      )}
    </form>
  );
}
