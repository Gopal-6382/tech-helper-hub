export interface CreateCommentReplyData {
  commentId: string;
  authorId: string;
  content: string;
}

export interface UpdateCommentReplyData {
  content: string;
}