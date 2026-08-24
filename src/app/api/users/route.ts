import { routeHandler } from "@/middleware/route.handler";
import { getMeAction } from "@/modules/users/actions/get-me.action";
import { updateMeAction } from "@/modules/users/actions/update-me.action";
import { deleteMeAction } from "@/modules/users/actions/delete-me.action";
import {
  updateMeSchema,
  deleteUserSchema,
} from "@/modules/users/validations/user.validation";
import { USER_ROLES } from "@/constant/role.constant";

// GET /api/users/me
export const GET = routeHandler(
  async (_req, user) => {
    return getMeAction(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

// PATCH /api/users/me
export const PATCH = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = updateMeSchema.parse(body);

    return updateMeAction(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// DELETE /api/users/me
export const DELETE = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = deleteUserSchema.parse(body);

    return deleteMeAction(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
