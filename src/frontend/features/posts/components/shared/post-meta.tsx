import { Post } from "../../types/post.types";
import { PostStatusBadge } from "../detail/post-status-badge";


export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PostStatusBadge status={post.status} />

      {post.category?.name && (
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
          {post.category.name}
        </span>
      )}
    </div>
  );
}