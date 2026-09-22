type PostStatus = "OPEN" | "SOLVED" | "CLOSED";

type PostAuthor = {
  id: string;
  name: string;
  avatar: string | null;
};

type PostCategory = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  authorId: string;
  categoryId: string | null;

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

  author: PostAuthor;
  category: PostCategory | null;

  likeCount: number;
  commentCount: number;

  isLiked: boolean;
  isSaved: boolean;
};
