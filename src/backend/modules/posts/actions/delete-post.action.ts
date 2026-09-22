import { PostService } from "../services/post.service";

const postService = new PostService();

export async function deletePost(id: string, authorId: string) {
  return postService.deletePost(id, authorId);
}
