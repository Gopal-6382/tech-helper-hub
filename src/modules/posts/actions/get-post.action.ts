import { PostService } from "../services/post.service";

const postService = new PostService();

export async function getPost(postId: string) {
  return postService.getPost(postId);
}