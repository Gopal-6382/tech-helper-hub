import { ProfileService } from "../services/profile.service";
import { createProfileSchema } from "../validations/profile.validation";

const profileService = new ProfileService();

export async function createProfile(userId: string, body: unknown) {
  const data = createProfileSchema.parse(body);

  return profileService.createProfile(userId, data);
}
