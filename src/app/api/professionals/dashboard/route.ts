import { authMiddleware } from "@/middleware/auth.middleware";

import { dashboard } from "@/modules/professional/actions/get-dashboard.action";

export const GET = authMiddleware(dashboard);