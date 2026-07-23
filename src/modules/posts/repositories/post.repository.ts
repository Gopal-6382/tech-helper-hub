import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import {
  CreatePostData,
  UpdatePostDto,
} from "../types/post.types";

export class PostRepository {
  // --------------------------------------------------
  // Get one post by id.
  //
  // Includes:
  // - Author
  // - Category
  // - Comment count
  // - Like count
  // --------------------------------------------------
  async findById(id: string) {
    return prisma.problemPost.findUnique({
      where: {
        id,
      },
      include: {
        author: true,

        category: true,

        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  // --------------------------------------------------
  // Feed
  //
  // Latest posts first.
  // --------------------------------------------------
  async findAll() {
    return prisma.problemPost.findMany({
      include: {
        author: true,

        category: true,

        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // --------------------------------------------------
  // Logged in user's posts.
  // --------------------------------------------------
  async findByAuthorId(authorId: string) {
    return prisma.problemPost.findMany({
      where: {
        authorId,
      },

      include: {
        category: true,

        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // --------------------------------------------------
  // Create new post.
  // --------------------------------------------------
  async create(data: CreatePostData) {
    return prisma.problemPost.create({
      data,
    });
  }

  // --------------------------------------------------
  // Update post.
  // --------------------------------------------------
  async update(
    id: string,
    data: UpdatePostDto,
  ) {
    return prisma.problemPost.update({
      where: {
        id,
      },

      data,
    });
  }

  // --------------------------------------------------
  // Change only status.
  // --------------------------------------------------
  async updateStatus(
    id: string,
    status: PostStatus,
  ) {
    return prisma.problemPost.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }

  // --------------------------------------------------
  // Delete post.
  // --------------------------------------------------
  async delete(id: string) {
    return prisma.problemPost.delete({
      where: {
        id,
      },
    });
  }

  // --------------------------------------------------
  // Increase view count.
  //
  // Atomic increment avoids race conditions.
  // --------------------------------------------------
  async incrementView(id: string) {
    return prisma.problemPost.update({
      where: {
        id,
      },

      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }
}