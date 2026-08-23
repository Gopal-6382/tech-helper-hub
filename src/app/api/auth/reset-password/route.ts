import { NextRequest } from "next/server";
import { handleApiError, successResponse } from "@/utils/api-response";
import { resetPasswordAction } from "@/modules/auth/actions/reset-password.action";
import { resetPasswordSchema } from "@/modules/auth/validations/auth.schema";

export async function POST(req: NextRequest) {
  try{
  const body = await req.json();
  const data = resetPasswordSchema.parse(body);
  const result = await resetPasswordAction(data);
  return successResponse(result);
}   catch (error){
    return handleApiError(error);
}

}
