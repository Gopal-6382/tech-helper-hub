"use client";

import { useEffect, useRef } from "react";

import { useMarkMessageRead } from "../hooks/use-mark-message-read";
import type { DirectMessage } from "../types/direct-chat.types";
import { MessageItem } from "./message-item";

type MessageListProps = {
  messages: DirectMessage[];
  currentUserId: string;
  isLoading?: boolean;
  onDelete?: (messageId: string) => void;
};

export function MessageList({
  messages,
  currentUserId,
  isLoading = false,
  onDelete,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const markedMessageIds = useRef<Set<string>>(new Set());

  const markMessageRead = useMarkMessageRead();

  useEffect(() => {
    const unreadMessages = messages.filter(
      (message) =>
        message.senderId !== currentUserId &&
        message.readAt === null &&
        !markedMessageIds.current.has(message.id),
    );

    if (unreadMessages.length === 0) {
      return;
    }

    for (const message of unreadMessages) {
      markedMessageIds.current.add(message.id);

      markMessageRead.mutate({
        messageId: message.id,
        chatId: message.conversationId,
      });
    }
  }, [messages, currentUserId, markMessageRead]);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [messages]);

  if (isLoading) {
    return (
      <div className="h-0 min-h-0 flex-1 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-4 py-5">
          <p className="text-sm text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-0 min-h-0 flex-1 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-6 text-center">
          <div>
            <p className="font-medium">No messages yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Send the first message.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <div
      ref={scrollRef}
      className="h-0 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {sortedMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
