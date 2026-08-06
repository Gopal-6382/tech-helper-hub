import { prisma } from "@/lib/prisma";
import { CreateGroupData } from "../types/groupchat.types";

export class GroupChatRepository {

  async create(data: CreateGroupData) {
    return prisma.group.create({
      data,
    });
  } 
}