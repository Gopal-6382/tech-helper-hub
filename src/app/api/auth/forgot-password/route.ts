import { NextRequest } from "next/server";

import { forgotPasswordAction } from "@/modules/auth/actions/forgot-password.action";
import { successResponse } from "@/utils/api-response";
import { forgotPasswordSchema } from "@/modules/auth/validations/auth.schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = forgotPasswordSchema.parse(body);
  const result = await forgotPasswordAction(data);
  return successResponse(result);
}
