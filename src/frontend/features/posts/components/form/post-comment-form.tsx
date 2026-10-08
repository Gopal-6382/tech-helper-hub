import { useState } from "react";

import { SubmitButton } from "@/frontend/components/form";
import { FormMessage } from "@/frontend/components/feedback/form-message";
import { Textarea } from "@/frontend/components/ui/textarea";

import { useCreateComment } from "@/frontend/features/posts/hooks/comments/use-create-comment";

type PostCommentFormProps = {
  postId: string;
};

export function PostCommentForm({ postId }: PostCommentFormProps) {
  const [content, setContent] = useState("");

  const createCommentMutation = useCreateComment();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
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
        <SubmitButton
          isSubmitting={createCommentMutation.isPending}
          loadingText="Commenting..."
          disabled={!content.trim()}
        >
          Comment
        </SubmitButton>
      </div>

      <FormMessage message={createCommentMutation.error?.message} />
    </form>
  );
}
