import { PostService } from "../services/post.service";

const postService = new PostService();

// --------------------------------------------------
// Only author can delete.
// --------------------------------------------------
export async function deletePost(
  id: string,
  authorId: string,
) {
  return postService.deletePost(
    id,
    authorId,
  );
}