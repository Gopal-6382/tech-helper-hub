import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { ServiceRequestService } from "../services/service-request.service";
import { createServiceRequestSchema } from "../validations/service-request.validation";

const serviceRequestService = new ServiceRequestService();

export async function createRequest(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const data =
    createServiceRequestSchema.parse(body);

  const result =
    await serviceRequestService.createRequest(
      user.userId,
      data,
    );

  return NextResponse.json(result, {
    status: 201,
  });
}