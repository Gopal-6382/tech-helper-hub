import { prisma } from "@/lib/prisma";

import type {
  CreatePostData,
  UpdatePostInput,
} from "../validations/post.validation";

import type { PostStatus } from "@prisma/client";

const postRelations = {
  author: {
    select: {
      id: true,
      name: true,
      avatar: true,

      profile: {
        select: {
          city: true,
          state: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  },

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },

  _count: {
    select: {
      comments: true,
      likes: true,
    },
  },
} as const;

export class PostRepository {
  // --------------------------------------------------
  // Get one post
  // --------------------------------------------------

  async findById(id: string) {
    return prisma.problemPost.findUnique({
      where: {
        id,
      },
      include: postRelations,
    });
  }

  // --------------------------------------------------
  // Get all posts
  // --------------------------------------------------

  async findAll() {
    return prisma.problemPost.findMany({
      include: postRelations,

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // --------------------------------------------------
  // Get posts by author
  // --------------------------------------------------

  async findByAuthorId(authorId: string) {
    return prisma.problemPost.findMany({
      where: {
        authorId,
      },

      include: postRelations,

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // --------------------------------------------------
  // Create
  // --------------------------------------------------

  async create(data: CreatePostData) {
    return prisma.problemPost.create({
      data: {
        authorId: data.authorId,
        categoryId: data.categoryId,
        title: data.title,
        content: data.content,
        images: data.images ?? [],
      },

      include: postRelations,
    });
  }

  // --------------------------------------------------
  // Update
  // --------------------------------------------------

  async update(
    id: string,
    data: UpdatePostInput,
  ) {
    return prisma.problemPost.update({
      where: {
        id,
      },

      data,

      include: postRelations,
    });
  }

  // --------------------------------------------------
  // Update only status
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

      include: postRelations,
    });
  }

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  async delete(id: string) {
    return prisma.problemPost.delete({
      where: {
        id,
      },
    });
  }

  // --------------------------------------------------
  // Increase view count
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

      include: postRelations,
    });
  }
}