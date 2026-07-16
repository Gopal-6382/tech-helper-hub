import { authMiddleware } from "@/middleware/auth.middleware";

import { getCategories } from "@/modules/professional/actions/get-categories.action";
import { updateCategories } from "@/modules/professional/actions/update-categories.action";

export const GET = authMiddleware(getCategories);

export const PATCH = authMiddleware(updateCategories);