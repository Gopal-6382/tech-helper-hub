import { routeHandler } from "@/middleware/route.handler";
import { createProfile } from "@/modules/profile/actions/create-profile.action";
import { getProfile } from "@/modules/profile/actions/get-profile.action";
import { updateProfile } from "@/modules/profile/actions/update-profile.action";
import {
  CreateProfileDto,
  createProfileSchema,
  UpdateProfileDto,
  updateProfileSchema,
} from "@/modules/profile/validations/profile.validation";
import { USER_ROLES } from "@/constant/role.constant";

// POST /api/profile
export const POST = routeHandler(
  async (req, user) => {
    const body: CreateProfileDto = await req.json();
    const data = createProfileSchema.parse(body);

    return createProfile(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// GET /api/profile
export const GET = routeHandler(
  async (_req, user) => {
    return getProfile(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

// PATCH /api/profile
export const PATCH = routeHandler(
  async (req, user) => {
    const body: UpdateProfileDto = await req.json();
    const data = updateProfileSchema.parse(body);

    return updateProfile(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
