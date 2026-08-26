import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/user.repository";

import { ChangePasswordDto, UpdateMeDto } from "../types/user.types";

export class UserService {
  private userRepository = new UserRepository();

  private sanitizeUser<
    T extends {
      password?: unknown;
      refreshToken?: unknown;
    },
  >(user: T) {
    const safeUser = { ...user };

    delete safeUser.password;
    delete safeUser.refreshToken;

    return safeUser;
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      message: "User fetched successfully",
      user: this.sanitizeUser(user),
    };
  }

  async updateMe(userId: string, data: UpdateMeDto) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await this.userRepository.findByEmail(data.email);

      if (existingEmail) {
        throw new Error("Email already exists");
      }
    }

    if (data.phone && data.phone !== user.phone) {
      const existingPhone = await this.userRepository.findByPhone(data.phone);

      if (existingPhone) {
        throw new Error("Phone number already exists");
      }
    }

    const updatedUser = await this.userRepository.update(userId, data);

    return {
      success: true,
      message: "User updated successfully",
      user: this.sanitizeUser(updatedUser),
    };
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(
      data.newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new Error(
        "New password must be different from your current password",
      );
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await this.userRepository.updatePassword(userId, hashedPassword);

    return {
      success: true,
      message: "Password changed successfully. Please login again.",
    };
  }

  async deactivateMeAction(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Your account is already deactivated");
    }

    await this.userRepository.deactivate(userId);

    return {
      success: true,
      message: "Account deactivated successfully",
    };
  }

  async activateMeAction(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isActive) {
      throw new Error("Your account is already active");
    }

    await this.userRepository.activate(userId);

    return {
      success: true,
      message: "Account activated successfully",
    };
  }
}
