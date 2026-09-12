import { SavedPostService } from "../services/saved-post.service";

const savedPostService = new SavedPostService();

export async function unsavePost(userId: string, postId: string) {
  return savedPostService.unsavePost(userId, postId);
}
