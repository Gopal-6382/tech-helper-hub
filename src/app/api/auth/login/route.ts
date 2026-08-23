import { NextRequest } from "next/server";
import { loginAction } from "@/modules/auth/actions/login.action";
import { loginSchema } from "@/modules/auth/validations/auth.schema";
import { successResponse, handleApiError } from "@/utils/api-response";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);
    const result = await loginAction(validatedData);
    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}
