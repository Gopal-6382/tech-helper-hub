import { PostLikeService } from "../services/post-like.service";

const postLikeService = new PostLikeService();

export async function unlikePost(postId: string, userId: string) {
  return postLikeService.unlikePost(postId, userId);
}