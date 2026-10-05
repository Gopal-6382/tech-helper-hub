import type { CommentAuthor } from "./comment.types";

export interface CommentReply {
  id: string;
  commentId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author: CommentAuthor | null;
}
