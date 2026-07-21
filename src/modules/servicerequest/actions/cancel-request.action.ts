import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function cancelRequest(
  req: NextRequest,
  user: JwtPayload,
  requestId: string,
) {
  const result = await serviceRequestService.cancelRequest(
    user.userId,
    requestId,
  );

  return NextResponse.json(result);
}
