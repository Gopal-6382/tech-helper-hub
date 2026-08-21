import { LoginUserDto, RegisterUserDto } from "../types/auth.types";

import { UserRepository } from "../repositories/user.repository";

import { comparePassword, hashPassword } from "../util/password";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../lib/jwt";

import { generateResetToken, hashResetToken } from "../util/reset-token";

import { PasswordResetRepository } from "../repositories/password-reset.repository";
import { EmailService } from "@/utils/email.service";
export class AuthService {
  private userRepository = new UserRepository();
  private passwordResetRepository = new PasswordResetRepository();
  private emailService = new EmailService();

  // Register user
  async register(data: RegisterUserDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user.id, user.role);

    const refreshToken = generateRefreshToken(user.id, user.role);

    const hashedRefreshToken = await hashPassword(refreshToken);

    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      success: true,
      message: "Registration successful",
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginUserDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("Your account has been disabled");
    }

    const passwordCorrect = await comparePassword(data.password, user.password);

    if (!passwordCorrect) {
      throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id, user.role);

    const refreshToken = generateRefreshToken(user.id, user.role);

    const hashedRefreshToken = await hashPassword(refreshToken);

    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      success: true,
      message: "Login successful",
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {
    await this.userRepository.updateRefreshToken(userId, null);

    return {
      success: true,
      message: "Logout successful",
    };
  }

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isActive) {
      throw new Error("Your account has been disabled");
    }

    if (!user.refreshToken) {
      throw new Error("Empty or Invalid refresh token");
    }

    const tokenMatches = await comparePassword(refreshToken, user.refreshToken);

    if (!tokenMatches) {
      throw new Error("Invalid refresh token");
    }

    const accessToken = generateAccessToken(user.id, user.role);

    return {
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);

    // Don't reveal whether an account exists.
    if (!user) {
      return {
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      };
    }

    const rawToken = generateResetToken();

    const tokenHash = hashResetToken(rawToken);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.passwordResetRepository.deleteUserTokens(user.id);

    await this.passwordResetRepository.create({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    await this.emailService.sendPasswordResetEmail({
      userEmail: user.email,
      userName: user.name,
      resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`,
    });

    return {
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }
  async resetPassword(token: string, newpassword: string) {
    const tokenHash = hashResetToken(token);

    const resetToken =
      await this.passwordResetRepository.findValidToken(tokenHash);

    if (!resetToken) {
      throw new Error("Invalid or expired password reset token");
    }

    const hashedPassword = await hashPassword(newpassword);

    await this.userRepository.updatePassword(resetToken.userId, hashedPassword);

    await this.passwordResetRepository.markAsUsed(resetToken.id);

    /*
     * Important:
     * Invalidate existing refresh token after password change.
     */
    await this.userRepository.updateRefreshToken(resetToken.userId, null);

    return {
      success: true,
      message: "Password reset successful",
    };
  }

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
}
