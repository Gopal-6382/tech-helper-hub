import { PostService } from "../services/post.service";
import { UpdatePostStatusInput } from "../validations/post.validation";

const postService = new PostService();

export async function updatePostStatus(
  id: string,
  authorId: string,
  status: UpdatePostStatusInput,
) {
  return postService.updateStatus(id, authorId, status.status);
}
