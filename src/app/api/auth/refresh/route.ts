import { NextRequest } from "next/server";
import { refreshAction } from "@/modules/auth/actions/refresh.action";
import { successResponse, handleApiError } from "@/utils/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = await refreshAction(body.refreshToken);

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}
