// src/frontend/types/post.ts

export type PostStatus =
  | "OPEN"
  | "SOLVED"
  | "CLOSED";

export type Post = {
  id: string;
  title: string;
  content: string;
  images: string[];
  status: PostStatus;
  viewCount: number;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;

  author: {
    id: string;
    name: string;
    avatar: string | null;
  };

  category: {
    id: string;
    name: string;
  };

  _count: {
    likes: number;
    comments: number;
  };
};