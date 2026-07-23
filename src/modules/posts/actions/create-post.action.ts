import { NextRequest } from "next/server";

import { PostService } from "../services/post.service";
import { createPostSchema } from "../validations/post.validation";

const postService = new PostService();

// --------------------------------------------------
// Business Rule:
// User must be authenticated.
// AuthorId comes from JWT.
// --------------------------------------------------
export async function createPost(
  req: NextRequest,
  authorId: string,
) {
  const body = await req.json();

  const data = createPostSchema.parse(body);

  return postService.createPost(authorId, data);
}