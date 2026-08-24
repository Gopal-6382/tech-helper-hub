import { SavedPostService } from "../services/saved-post.service";
import { CreateSavedPostDto } from "../types/saved-post.types";

const savedPostService = new SavedPostService();

export async function savePost(userId: string, data: CreateSavedPostDto) {
  return savedPostService.savePost(userId, data);
}
