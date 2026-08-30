export interface CreatePostLikeDto {
  postId: string;
}

export interface CreatePostLikeData {
  postId: string;
  userId: string;
}
export interface PrismaKnownRequestError extends Error {
  code?: string;
  meta?: Record<string, unknown>;
}
