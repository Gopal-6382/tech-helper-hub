import { PostService } from "../services/post.service";

import type { CreatePostData } from "../types/post.types";

const postService = new PostService();

export async function createPost(
  body: CreatePostData,
) {
  return postService.createPost(body);
}