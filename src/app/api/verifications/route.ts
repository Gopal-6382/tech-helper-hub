import { authMiddleware } from "@/middleware/auth.middleware";

import { uploadVerification } from "@/modules/verification/actions/upload-verification.action";
import { getVerification } from "@/modules/verification/actions/get-verification.action";
import { updateVerification } from "@/modules/verification/actions/update-verification.action";

export const POST = authMiddleware(uploadVerification);

export const GET = authMiddleware(getVerification);

export const PATCH = authMiddleware(updateVerification);