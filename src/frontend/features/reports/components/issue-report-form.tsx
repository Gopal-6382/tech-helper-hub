"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Textarea } from "@/frontend/components/ui/textarea";

import { useCreateIssueReport } from "../hooks/use-create-issue-report";
import { IssueReportCategory } from "../types/issue-report.types";

type IssueReportFormProps = {
  onSuccess?: () => void;
};

export function IssueReportForm({ onSuccess }: IssueReportFormProps) {
  const [category, setCategory] = useState<IssueReportCategory>(
    IssueReportCategory.BUG,
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);

  const createMutation = useCreateIssueReport();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!category || !trimmedTitle || !trimmedDescription) {
      return;
    }

    const pageUrl = window.location.href;

    createMutation.mutate(
      {
        category,
        title: trimmedTitle,
        description: trimmedDescription,
        rating,
        pageUrl,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setRating(3);

          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="report-category" className="text-sm font-medium">
          Category
        </label>

        <select
          id="report-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as IssueReportCategory)
          }
          disabled={createMutation.isPending}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value={IssueReportCategory.BUG}>Bug</option>
          <option value={IssueReportCategory.PAYMENT}>Payment</option>
          <option value={IssueReportCategory.ACCOUNT}>Account</option>
          <option value={IssueReportCategory.BOOKING}>Booking</option>
          <option value={IssueReportCategory.CHAT}>Chat</option>
          <option value={IssueReportCategory.CONTENT}>Content</option>
          <option value={IssueReportCategory.UI}>UI</option>
          <option value={IssueReportCategory.OTHER}>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="report-title" className="text-sm font-medium">
          Title
        </label>

        <Input
          id="report-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What went wrong?"
          maxLength={150}
          disabled={createMutation.isPending}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="report-description" className="text-sm font-medium">
          Description
        </label>

        <Textarea
          id="report-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe the problem..."
          rows={5}
          maxLength={2000}
          disabled={createMutation.isPending}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Page rating</label>

          <span className="text-sm text-muted-foreground">{rating}/5</span>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              disabled={createMutation.isPending}
              aria-label={`Rate page ${value} out of 5`}
              aria-pressed={rating === value}
              className={`flex size-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                rating === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input hover:bg-accent"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {createMutation.isError && (
        <p className="text-sm text-destructive">
          {createMutation.error.message || "Failed to submit report."}
        </p>
      )}

      {createMutation.isSuccess && (
        <p className="text-sm text-green-600">Report submitted successfully.</p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            createMutation.isPending ||
            !category ||
            !title.trim() ||
            !description.trim()
          }
        >
          {createMutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Send className="mr-2 size-4" />
          )}

          {createMutation.isPending ? "Submitting..." : "Submit report"}
        </Button>
      </div>
    </form>
  );
}
