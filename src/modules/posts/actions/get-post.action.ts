import { PostService } from "../services/post.service";

const postService = new PostService();

// --------------------------------------------------
// Get one post.
// --------------------------------------------------
export async function getPost(id: string) {
  return postService.getPost(id);
}