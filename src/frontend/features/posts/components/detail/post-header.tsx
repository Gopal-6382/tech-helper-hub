import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { PostHeaderProps } from "../../types/post.types";
import Image from "next/image";
import { PostMenu } from "../actions/post-menu";

export function PostHeader({
  post,
  isOwner,
  onEdit,
  onDelete,
  onUpdateStatus,
  onReport,
}: PostHeaderProps) {
  const { author } = post;

  const avatarFallback = (author.name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name ?? "User"}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm font-semibold">
              {avatarFallback}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {author.name ?? "Unknown user"}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <PostMenu
        canEdit={isOwner}
        canDelete={isOwner}
        canUpdateStatus={isOwner}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdateStatus={onUpdateStatus}
        onReport={onReport}
      />
    </div>
  );
}
