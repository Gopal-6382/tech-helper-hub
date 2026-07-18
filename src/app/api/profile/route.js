import { authMiddleware } from "@/middleware/auth.middleware";

import { createProfile } from "@/modules/profile/actions/create-profile.action";
import { getProfile } from "@/modules/profile/actions/get-profile.action";
import { updateProfile } from "@/modules/profile/actions/update-profile.action";

export const POST = authMiddleware(createProfile);

export const GET = authMiddleware(getProfile);

export const PATCH = authMiddleware(updateProfile);
