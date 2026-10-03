type PostStatus = "OPEN" | "SOLVED" | "CLOSED";

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

export type PostAuthor = {
  id: string;
  name: string | null;
  avatar: string | null;
};

export type PostCategory = {
  id: string;
  name: string;
  slug: string;
};

export type PostImage = string;

export type PostCounts = {
  likes: number;
  comments: number;
};

export type PostWithExtras = Post & {
  author: PostAuthor | null;
  category: PostCategory | null;
  isLiked: boolean;
  isSaved: boolean;
  _count: PostCounts;
};
