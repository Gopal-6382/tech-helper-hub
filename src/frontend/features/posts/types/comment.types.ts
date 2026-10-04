export interface CommentAuthor {
  id: string;
  name: string | null;
  avatar: string | null;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author: CommentAuthor | null;
}