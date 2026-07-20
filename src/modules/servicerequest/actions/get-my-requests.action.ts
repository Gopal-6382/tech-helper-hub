import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getMyRequests(
  req: NextRequest,
  user: JwtPayload,
) {
  const result =
    await serviceRequestService.getMyRequests(
      user.userId,
    );

  return NextResponse.json(result);
}