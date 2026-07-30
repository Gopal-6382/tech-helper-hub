import { PostService } from "../services/saved-post.service";

const postService = new PostService();

// Latest feed.
export async function getPosts() {
  return postService.getPosts();
}
