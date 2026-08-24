import { ProfileService } from "../services/profile.service";
import { updateProfileSchema } from "../validations/profile.validation";

const profileService = new ProfileService();

export async function updateProfile(userId: string, body: unknown) {
  const data = updateProfileSchema.parse(body);

  return profileService.updateProfile(userId, data);
}
