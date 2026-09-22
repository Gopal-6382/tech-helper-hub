import { PostService } from "../services/post.service";

const postService = new PostService();

export async function increasePostView(id: string) {
  return postService.increaseView(id);
}
