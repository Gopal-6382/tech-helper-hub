import { PostService } from "../services/post.service";

const postService = new PostService();

export async function getPost(id: string) {
  return postService.getPost(id);
}