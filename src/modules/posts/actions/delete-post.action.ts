import { PostService } from "../services/post.service";

const postService = new PostService();

export async function deletePost(postId: string, userId: string) {
  await postService.deletePost(postId, userId);

  return {
    success: true,
    message: "Post deleted successfully",
  };
}
