"use client";

import type { DirectMessage } from "../types/direct-chat.types";

type MessageItemProps = {
  message: DirectMessage;
  currentUserId: string;
  onDelete?: (messageId: string) => void;
};

export function MessageItem({
  message,
  currentUserId,
  onDelete,
}: MessageItemProps) {
  const isOwnMessage = message.senderId === currentUserId;
  const isRead = message.readAt !== null;

  return (
    <div
      className={`flex w-full ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${
          isOwnMessage ? "items-end" : "items-start"
        }`}
      >
        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isOwnMessage
              ? "rounded-br-md bg-primary"
              : "rounded-bl-md border border-border bg-card"
          }`}
        >
          <p
            className={`whitespace-pre-wrap wrap-break-word font-medium leading-6 ${
              isOwnMessage
                ? "text-background font-semibold text-[15px] md:text-[22px]"
                : "text-foreground font-semibold text-[15px] md:text-[22px]"
            }`}
          >
            {message.content || ""}
          </p>
        </div>

        {/* Message meta */}
        <div
          className={`mt-1 flex items-center gap-2 px-1 text-[11px] text-muted-foreground ${
            isOwnMessage ? "justify-end" : "justify-start"
          }`}
        >
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isOwnMessage && isRead ? <span>Read</span> : null}

          {isOwnMessage && onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(message.id)}
              className="font-medium transition-colors hover:text-destructive"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
