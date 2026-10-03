export type CommentReply = {
  id: string;
  commentId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author?: {
    id: string;
    name?: string | null;
    avatar?: string | null;
  };
};
