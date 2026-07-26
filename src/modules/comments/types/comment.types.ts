export interface CreateCommentDto {
  postId: string;
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}