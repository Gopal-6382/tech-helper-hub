"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createReportSchema } from "@/modules/postreport/validations/postreport.validations";

import { useCreateReport } from "@/frontend/features/posts/hooks/moderation/use-report-post";

import { SubmitButton, TextField } from "@/frontend/components/form";

import type { CreateReportData } from "@/modules/postreport/types/postreport.types";

type ReportPostFormProps = {
  postId: string;
  onSuccess?: () => void;
};

export function ReportPostForm({ postId, onSuccess }: ReportPostFormProps) {
  const createMutation = useCreateReport();

  const form = useForm<CreateReportData>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      postId,
      reason: "",
    },
  });

  const onSubmit = async (data: CreateReportData) => {
    try {
      await createMutation.mutateAsync(data);

      form.reset({
        postId,
        reason: "",
      });

      onSuccess?.();
    } catch {
      // mutation error is displayed below
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <TextField
        control={form.control}
        name="reason"
        label="Reason"
        placeholder="Why are you reporting this post?"
        required
      />

      {createMutation.error && (
        <p role="alert" className="text-sm text-destructive">
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : "Failed to report this post."}
        </p>
      )}

      <SubmitButton
        isSubmitting={createMutation.isPending}
        loadingText="Submitting..."
        className="w-full"
      >
        Submit report
      </SubmitButton>
    </form>
  );
}
