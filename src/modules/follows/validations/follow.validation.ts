import { z } from "zod";

export const createFollowSchema = z.object({
  followingId: z.uuid("Invalid user id"),
});

export type CreateFollowDto = z.infer<typeof createFollowSchema>;
