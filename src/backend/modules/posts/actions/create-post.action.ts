import { PostService } from "../services/post.service";

import type { CreatePostData } from "../validations/post.validation";

const postService = new PostService();

export async function createPost(body: CreatePostData) {
  return postService.createPost(body);
}
