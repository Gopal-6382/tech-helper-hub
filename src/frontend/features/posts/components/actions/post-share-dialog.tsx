"use client";

import { useState } from "react";
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

  const getShareUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/web/posts/${postId}`;
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
        return;
      } catch (error) {
        console.error(error);
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopy = async () => {
    const url = getShareUrl();

    if (!url) return;

    await navigator.clipboard.writeText(url);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
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
          />
        }
      >
        <Share2 className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share post</DialogTitle>
        </DialogHeader>

        <h6 className="text-center text-xs text-primary">
          <a href={getShareUrl()}>{getShareUrl()}</a>
        </h6>

        <div className="flex gap-2">
          <Button type="button" className="flex-1" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button type="button" variant="outline" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {copied && (
          <p className="text-sm text-muted-foreground">Link copied.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
