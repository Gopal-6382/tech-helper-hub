import { NextRequest } from "next/server";

import { registerAction } from "@/modules/auth/actions/register.action";
import { successResponse, handleApiError } from "@/utils/api-response";
import { registerSchema } from "@/modules/auth/validations/auth.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = registerSchema.parse(body);

    const data = await registerAction(validatedData);

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}
