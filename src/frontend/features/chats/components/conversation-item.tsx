"use client";

import { useParticipants } from "../hooks/use-participants";
import type { DirectConversation } from "../types/direct-chat.types";
import { UserAvatar } from "@/frontend/components/common/user-avatar";

type ConversationItemProps = {
  conversation: DirectConversation;
  currentUserId: string;
  active?: boolean;
  onClick: () => void;
};

export function ConversationItem({
  conversation,
  currentUserId,
  active = false,
  onClick,
}: ConversationItemProps) {
  const { data: participants, isLoading } = useParticipants(conversation.id);

  const otherParticipant =
    participants?.find((participant) => participant.userId !== currentUserId) ??
    null;

  const participantName = otherParticipant?.user?.name?.trim() || "User";

  const latestMessage =
    conversation.messages.length > 0
      ? [...conversation.messages].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0]
      : null;

  const unreadCount = conversation.messages.filter(
    (message) => message.senderId !== currentUserId && message.readAt === null,
  ).length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors ${
        active ? "bg-muted" : "hover:bg-muted/60"
      }`}
    >
      <UserAvatar
        name={participantName}
        src={otherParticipant?.user?.avatar}
        size="default"
        className="size-9 sm:size-10"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold">
            {isLoading ? "Loading..." : participantName}
          </p>

          {conversation.lastMessageAt ? (
            <span className="shrink-0 text-xs text-muted-foreground">
              {new Date(conversation.lastMessageAt).toLocaleDateString()}
            </span>
          ) : null}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {latestMessage?.content || "No messages yet"}
          </p>

          {unreadCount > 0 ? (
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
