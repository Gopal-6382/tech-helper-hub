import { ProfileRepository } from "../repositories/profile.repository";
import {
  CreateProfileDto,
  UpdateProfileDto,
} from "../types/profile.types";

export class ProfileService {
  private profileRepository = new ProfileRepository();

  async createProfile(userId: string, data: CreateProfileDto) {
    const existingProfile =
      await this.profileRepository.findByUserId(userId);

    if (existingProfile) {
      throw new Error("Profile already exists");
    }

    const profile = await this.profileRepository.create(
      userId,
      data,
    );

    return {
      success: true,
      message: "Profile created successfully",
      profile,
    };
  }

  async getProfile(userId: string) {
    const profile =
      await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return {
      success: true,
      profile,
    };
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileDto,
  ) {
    const existingProfile =
      await this.profileRepository.findByUserId(userId);

    if (!existingProfile) {
      throw new Error("Profile not found");
    }

    const profile =
      await this.profileRepository.update(userId, data);

    return {
      success: true,
      message: "Profile updated successfully",
      profile,
    };
  }
}