import { PostLikeService } from "../services/post-like.service";
import {
  CreatePostLikeDto,
  createPostLikeSchema,
} from "../validations/post-like.validation";

const postLikeService = new PostLikeService();

export async function likePost(userId: string, body: CreatePostLikeDto) {
  const { postId } = createPostLikeSchema.parse(body);

  return postLikeService.likePost(postId, userId);
}
