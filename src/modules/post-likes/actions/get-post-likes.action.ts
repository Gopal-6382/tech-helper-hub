import { PostLikeService } from "../services/post-like.service";
import { CreatePostLikeDto } from "../types/post-like.types";

const postLikeService = new PostLikeService();

export async function getPostLikes(data: CreatePostLikeDto) {
  return postLikeService.getPostLikes(data.postId);
}
