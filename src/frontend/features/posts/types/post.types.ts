type PostStatus = "OPEN" | "SOLVED" | "CLOSED";

interface PostAuthorProfile {
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface PostAuthor {
  id: string;
  name: string | null;
  avatar: string | null;
  profile: PostAuthorProfile | null;
}

interface PostCategory {
  id: string;
  name: string;
  slug: string;
}

interface PostCounts {
  likes: number;
  comments: number;
  savedBy: number;
}

export interface Post {
  id: string;
  authorId: string;
  categoryId: string | null;

  title: string;
  content: string;
  images: string[];

  status: PostStatus;
  viewCount: number;

  createdAt: string;
  updatedAt: string;

  author: PostAuthor;
  category: PostCategory | null;

  isLiked: boolean;
  isSaved: boolean;
  isViewed: boolean;

  _count: PostCounts;
}

export interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onReport?: (postId: string) => void;
  viewed?: boolean;
}

export interface PostHeaderProps {
  post: Post;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport?: () => void;
}

export type PostListProps = {
  posts: Post[];
  currentUserId?: string;
  isLoading?: boolean;
  error?: Error | null;
  onReport?: (postId: string) => void;
};
