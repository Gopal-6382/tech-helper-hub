import { PostLikeService } from "../services/post-like.service";
import { CreatePostLikeData } from "../types/post-like.types";

const postLikeService = new PostLikeService();

export async function unlikePost(body: CreatePostLikeData) {
  return postLikeService.unlikePost(body.postId, body.userId);
}
