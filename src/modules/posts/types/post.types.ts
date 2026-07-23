import { PostStatus } from "@prisma/client";

// --------------------------------------------------
// Used when creating a new problem post.
//
// authorId comes from JWT inside the service,
// so the client never sends it.
// --------------------------------------------------
export interface CreatePostDto {
  categoryId?: string;
  title: string;
  content: string;
  images?: string[];

  city?: string;
  latitude?: number;
  longitude?: number;
}

// --------------------------------------------------
// Internal DTO.
//
// Service adds authorId before sending
// data to Repository.
// --------------------------------------------------
export interface CreatePostData extends CreatePostDto {
  authorId: string;
}

// --------------------------------------------------
// User can edit only these fields.
//
// Author cannot directly change
// authorId
// viewCount
// status
// createdAt
// --------------------------------------------------
export interface UpdatePostDto {
  categoryId?: string;

  title?: string;

  content?: string;

  images?: string[];

  city?: string;

  latitude?: number;

  longitude?: number;
}

// --------------------------------------------------
// Only status update.
// Used when solving/closing a post.
// --------------------------------------------------
export interface UpdatePostStatusDto {
  status: PostStatus;
}