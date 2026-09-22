import { PostStatus } from "@prisma/client";

export interface CreatePostDto {
  categoryId?: string;
  title: string;
  content: string;
  images?: string[];
}

export interface CreatePostData extends CreatePostDto {
  authorId: string;
}

export interface UpdatePostDto {
  categoryId?: string | null;
  title?: string;
  content?: string;
  images?: string[];
}

export interface UpdatePostStatusData {
  status: PostStatus;
}