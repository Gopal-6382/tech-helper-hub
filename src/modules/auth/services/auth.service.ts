import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import type { RegisterInput, LoginInput, AuthResponse, JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRATION = '7d';

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByEmail(input.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists',
          error: 'Email is already registered',
        };
      }

      // Hash password
      const hashedPassword = await hash(input.password, 12);

      // Create user
      const user = await userRepository.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      return {
        success: true,
        message: 'Registration successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed',
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await userRepository.findByEmail(input.email);
      if (!user) {
        return {
          success: false,
          message: 'Login failed',
          error: 'Invalid email or password',
        };
      }

      // Compare passwords
      const isPasswordValid = await compare(input.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Login failed',
          error: 'Invalid email or password',
        };
      }

      // Generate JWT token
      const token = sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = verify(token, JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async refreshToken(userId: string): Promise<string> {
    return sign(
      { id: userId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
  }
}

export const authService = new AuthService();
