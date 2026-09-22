import { PostService } from "../services/post.service";

import type { PostStatus } from "@prisma/client";

const postService = new PostService();

export async function updatePostStatus(
  id: string,
  authorId: string,
  status: PostStatus,
) {
  return postService.updateStatus(
    id,
    authorId,
    status,
  );
}