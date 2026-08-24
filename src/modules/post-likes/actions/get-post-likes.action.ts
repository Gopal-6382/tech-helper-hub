import { PostLikeService } from "../services/post-like.service";

const postLikeService = new PostLikeService();

export async function getPostLikes(postId: string) {
  return postLikeService.getPostLikes(postId);
}