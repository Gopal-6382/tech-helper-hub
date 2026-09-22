import { PostService } from "../services/post.service";

const postService = new PostService();

export async function getMyPosts(authorId: string) {
  return postService.getMyPosts(authorId);
}
