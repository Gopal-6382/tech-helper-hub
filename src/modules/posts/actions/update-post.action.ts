import { PostService } from "../services/post.service";
import { UpdatePostDto } from "../types/post.types";

const postService = new PostService();

export async function updatePost(
  postId: string,
  userId: string,
  body: UpdatePostDto,
) {
  return postService.updatePost(postId, userId, body);
}
