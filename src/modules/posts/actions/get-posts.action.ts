import { PostService } from "../services/post.service";

const postService = new PostService();

export async function getPosts() {
  return postService.getPosts();
}