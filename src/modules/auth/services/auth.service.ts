import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterUserDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const accessToken = this.generateAccessToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id, user.role);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.updateRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    const { password, refreshToken: _, ...safeUser } = user;

    return {
      success: true,
      message: "Registration successful",
      user: safeUser,
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

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    const accessToken = this.generateAccessToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id, user.role);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.updateRefreshToken(
      user.id,
      hashedRefreshToken,
    );

    const { password, refreshToken: _, ...safeUser } = user;

    return {
      success: true,
      message: "Login successful",
      user: safeUser,
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

  private generateAccessToken(userId: string, role: string) {
    return jwt.sign(
      { userId, role },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
      }
    );
  }

  private generateRefreshToken(userId: string, role: string) {
    return jwt.sign(
      { userId, role },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      }
    );
  }

async getCurrentUser(userId: string) {
  const user = await this.userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "Current user fetched successfully",
    user,
  };
}
}
