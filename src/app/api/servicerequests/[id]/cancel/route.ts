import { authMiddleware } from "@/middleware/auth.middleware";

import { cancelRequest } from "@/modules/servicerequest/actions/cancel-request.action";

export const PATCH = authMiddleware(
  async (req, user, context) => {
    const { id } = await context.params;

    return cancelRequest(req, user, id);
  },
);