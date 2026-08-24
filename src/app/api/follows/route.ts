import { routeHandler } from "@/middleware/route.handler";
import { followUser } from "@/modules/follows/actions/follow-user.action";
import { USER_ROLES } from "@/constant/role.constant";
import {
  CreateFollowDto,
  createFollowSchema,
} from "@/modules/follows/validations/follow.validation";

export const POST = routeHandler(
  async (req, user) => {
    const body: CreateFollowDto = await req.json();
    const data = createFollowSchema.parse(body);

    return followUser(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
