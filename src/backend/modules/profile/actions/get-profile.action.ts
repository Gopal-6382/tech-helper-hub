import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export async function getProfile(userId: string) {
  return profileService.getProfile(userId);
}
