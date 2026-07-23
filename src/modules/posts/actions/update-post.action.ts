import { NextRequest } from "next/server";

import { PostService } from "../services/post.service";
import { updatePostSchema } from "../validations/post.validation";

const postService = new PostService();

// --------------------------------------------------
// Only author can update.
// --------------------------------------------------
export async function updatePost(
  req: NextRequest,
  id: string,
  authorId: string,
) {
  const body = await req.json();

  const data = updatePostSchema.parse(body);

  return postService.updatePost(
    id,
    authorId,
    data,
  );
}