"use client";

import { useForm } from "react-hook-form";

import { TextareaField, SubmitButton } from "@/frontend/components/form";
import { useCreateCommentReply } from "@/frontend/features/posts/hooks/comments/comments-replies/use-create-comment-reply";

type PostCommentReplyFormProps = {
  commentId: string;
  authorId: string;
};

type ReplyFormValues = {
  content: string;
};

export function PostCommentReplyForm({
  commentId,
  authorId,
}: PostCommentReplyFormProps) {
  const createCommentReply = useCreateCommentReply();

  const form = useForm<ReplyFormValues>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: ReplyFormValues) => {
    const content = values.content.trim();

    if (!content) {
      form.setError("content", {
        type: "manual",
        message: "Reply cannot be empty.",
      });
      return;
    }

    createCommentReply.mutate(
      {
        commentId,
        authorId,
        content,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-3">
      <TextareaField
        control={form.control}
        name="content"
        placeholder="Write a reply..."
        rows={3}
        disabled={createCommentReply.isPending}
      />

      <div className="flex justify-end">
        <SubmitButton
          isSubmitting={createCommentReply.isPending}
          loadingText="Replying..."
          size="sm"
        >
          Reply
        </SubmitButton>
      </div>
    </form>
  );
}
