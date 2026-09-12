import { SavedPostService } from "@/modules/saveposts/services/saved-post.service";

const savedPostService = new SavedPostService();

export async function getSavedPosts(userId: string) {
  return savedPostService.getSavedPosts(userId);
}
