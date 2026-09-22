import { PostStatus } from "@prisma/client";

export interface CreatePostDto {
  categoryId?: string;
  title: string;
  content: string;
  images?: string[];
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreatePostData extends CreatePostDto {
  authorId: string;
}

export interface UpdatePostDto {
  categoryId?: string;
  title?: string;
  content?: string;
  images?: string[];
  city?: string;
  latitude?: number;
  longitude?: number;
  status?: PostStatus;
}
