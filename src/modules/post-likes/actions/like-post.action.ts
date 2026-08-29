import { PostLikeService } from "../services/post-like.service";
import { CreatePostLikeData } from "../types/post-like.types";

const postLikeService = new PostLikeService();

export async function likePost(body: CreatePostLikeData) {
  return postLikeService.likePost(body.postId, body.userId);
}
