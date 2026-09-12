import { z } from "zod";

export const createFollowSchema = z.object({
  followingId: z.string().uuid("Invalid user id"),
});

export type CreateFollowDto = z.infer<typeof createFollowSchema>;

export interface CreateFollowData {
  followerId: string;
  followingId: string;
}
