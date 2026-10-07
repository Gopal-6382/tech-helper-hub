"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/frontend/components/ui/button";
import { Textarea } from "@/frontend/components/ui/textarea";

type MessageFormProps = {
  onSend: (content: string) => Promise<void> | void;
  isSending?: boolean;
  disabled?: boolean;
};

export function MessageForm({
  onSend,
  isSending = false,
  disabled = false,
}: MessageFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent || isSending || disabled) {
      return;
    }

    await onSend(trimmedContent);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a message..."
          disabled={disabled || isSending}
          rows={1}
          className="max-h-32 min-h-11 resize-none"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />

        <Button
          type="submit"
          disabled={disabled || isSending || content.trim().length === 0}
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>

      <p className="mx-auto mt-1 max-w-3xl px-1 text-[11px] text-muted-foreground">
        Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}
