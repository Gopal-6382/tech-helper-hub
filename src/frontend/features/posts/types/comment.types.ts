export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author?: {
    id: string;
    name?: string | null;
    avatar?: string | null;
  };
};
