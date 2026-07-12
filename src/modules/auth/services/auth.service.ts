import bcrypt from "bcryptjs";
import { RegisterUserDto, LoginUserDto } from "../types/auth.types";
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

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    return user;
  }
}
