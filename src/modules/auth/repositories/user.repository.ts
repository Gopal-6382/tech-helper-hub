import { PrismaClient } from '../../generated/prisma/client';
import type { User } from '../types';

// Ensure we only have one instance of PrismaClient in development
const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> };

export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prismaClient;

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    return await prismaClient.user.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      password: string;
    }>
  ): Promise<User> {
    return await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return await prismaClient.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }
}

export const userRepository = new UserRepository();
