import { PostService } from "../services/post.service";

const postService = new PostService();

// --------------------------------------------------
// Latest feed.
// --------------------------------------------------
export async function getPosts() {
  return postService.getPosts();
}