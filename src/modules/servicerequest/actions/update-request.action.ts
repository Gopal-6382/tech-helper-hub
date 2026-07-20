import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { ServiceRequestService } from "../services/service-request.service";
import { updateServiceRequestSchema } from "../validations/service-request.validation";

const serviceRequestService = new ServiceRequestService();

export async function updateRequest(
  req: NextRequest,
  user: JwtPayload,
  requestId: string,
) {
  const body = await req.json();

  const data =
    updateServiceRequestSchema.parse(body);

  const result =
    await serviceRequestService.updateRequest(
      user.userId,
      requestId,
      data,
    );

  return NextResponse.json(result);
}