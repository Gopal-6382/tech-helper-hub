import { routeHandler } from "@/middleware/route.handler";
import { uploadVerification } from "@/modules/verification/actions/upload-verification.action";
import { getVerification } from "@/modules/verification/actions/get-verification.action";
import { updateVerification } from "@/modules/verification/actions/update-verification.action";
import {
  createVerificationSchema,
  updateVerificationSchema,
} from "@/modules/verification/validations/verification.validation";
import { USER_ROLES } from "@/constant/role.constant";

// POST /api/verification
export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = createVerificationSchema.parse(body);

    return uploadVerification(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// GET /api/verification
export const GET = routeHandler(
  async (_req, user) => {
    return getVerification(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

// PATCH /api/verification
export const PATCH = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = updateVerificationSchema.parse(body);

    return updateVerification(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
