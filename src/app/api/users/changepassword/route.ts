import { routeHandler } from "@/middleware/route.handler";
import { changePasswordAction } from "@/modules/users/actions/change-password.action";
import { changePasswordSchema } from "@/modules/users/validations/user.validation";
import { USER_ROLES } from "@/constant/role.constant";

// PATCH /api/users/change-password
export const PATCH = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = changePasswordSchema.parse(body);

    return changePasswordAction(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
