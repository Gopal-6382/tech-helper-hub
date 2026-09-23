// types/post.types.ts

export type PostStatus = "OPEN" | "SOLVED" | "CLOSED";

export type PostAuthor = {
  id: string;
  name?: string | null;
  avatar?: string | null;
};

export type PostCategory = {
  id: string;
  name: string;
};

export type PostCounts = {
  likes: number;
  comments: number;
};

export type Post = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  images: string[];
  city?: string | null;
  status: PostStatus;
  viewCount: number;
  createdAt: string;

  author?: PostAuthor | null;
  category?: PostCategory | null;

  _count?: PostCounts;

  isLiked?: boolean;
  isSaved?: boolean;
};
