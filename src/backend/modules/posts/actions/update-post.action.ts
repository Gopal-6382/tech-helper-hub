import { PostService } from "../services/post.service";

import type { UpdatePostInput } from "../validations/post.validation";

const postService = new PostService();

export async function updatePost(
  id: string,
  authorId: string,
  body: UpdatePostInput,
) {
  return postService.updatePost(id, authorId, body);
}
