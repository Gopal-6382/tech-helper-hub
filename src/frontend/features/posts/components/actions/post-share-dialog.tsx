"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/frontend/components/ui/dialog";
import type { PostShareDialogProps } from "@/frontend/features/posts/types/post-action.types";

export function PostShareDialog({ postId }: PostShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const getShareUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/web/posts/${postId}`;
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShareError(null);
    } catch {
      setShareError(
        "Unable to copy the link. Please copy it manually from above.",
      );
    }
  };

  const handleShare = async () => {
    const url = getShareUrl();

    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tech Helper Hub",
          text: "Check out this problem post.",
          url,
        });

        setShareError(null);
        return;
      } catch (error) {
        // Do not show an error when the user closes the native share sheet.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Native share failed:", error);
      }
    }

    await copyToClipboard(url);
  };

  const handleCopy = async () => {
    const url = getShareUrl();

    if (!url) return;

    await copyToClipboard(url);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Share post"
            className="rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          />
        }
      >
        <Share2 className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share post</DialogTitle>
        </DialogHeader>

        <div className="w-full rounded-2xl border border-border bg-muted px-4 py-3">
          <a
            href={getShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block w-full break-all text-center text-xs font-medium leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
          >
            {getShareUrl()}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Share2 className="h-4 w-4 fill-current" />
            Share
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Link copied" : "Copy link"}
            className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              copied
                ? "bg-success/10 text-success"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        {copied && (
          <p
            role="status"
            aria-live="polite"
            className="flex items-center justify-center gap-2 rounded-full bg-success/10 px-3 py-2 text-sm font-medium text-success"
          >
            <Check className="h-4 w-4" />
            Link copied.
          </p>
        )}

        {shareError && (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-full bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {shareError}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
