"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

import { usePostSave } from "@/frontend/features/posts/hooks/interactions/use-post-save";
import type { PostSaveButtonProps } from "@/frontend/features/posts/types/post-action.types";

export function PostSaveButton({
  postId,
  initialSaved = false,
  initialSaveCount = 0,
}: PostSaveButtonProps) {
  const saveMutation = usePostSave();

  const [saved, setSaved] = useState(initialSaved);
  const [saveCount, setSaveCount] = useState(initialSaveCount);
  const [tap, setTap] = useState(0);

  const handleSave = () => {
    if (saveMutation.isPending) return;

    const nextSaved = !saved;

    setSaved(nextSaved);
    setSaveCount((count) => (nextSaved ? count + 1 : Math.max(count - 1, 0)));
    setTap((value) => value + 1);

    saveMutation.mutate(
      {
        postId,
        saved: nextSaved,
      },
      {
        onError: (error) => {
          const message =
            error instanceof Error ? error.message.toLowerCase() : "";

          if (message.includes("already saved")) {
            // The save already exists on the server.
            // Keep saved state, but remove the extra +1.
            setSaved(true);
            setSaveCount((count) => Math.max(count - 1, 0));
            return;
          }

          // Real failure: roll back both state and count.
          setSaved(!nextSaved);
          setSaveCount((count) =>
            nextSaved ? Math.max(count - 1, 0) : count + 1,
          );
        },
      },
    );
  };

  return (
    <button
      type="button"
      disabled={saveMutation.isPending}
      onClick={handleSave}
      aria-label={saved ? "Unsave post" : "Save post"}
      className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
        saved
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <Bookmark
        key={`save-${tap}`}
        className={`h-6 w-6 transition-transform group-active:scale-90 ${
          saved ? "fill-current" : ""
        } ${
          tap > 0
            ? "animate-in slide-in-from-bottom-2 zoom-in-75 fade-in duration-300"
            : ""
        }`}
      />

      <span className="hidden sm:inline">
        {saved ? "Saved" : "Save"}
        {saveCount > 0 ? ` ${saveCount}` : ""}
      </span>
    </button>
  );
}
