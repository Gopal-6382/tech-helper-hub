import { NextRequest, NextResponse } from "next/server";

import { refreshAction } from "@/modules/auth/actions/refresh.action";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await refreshAction(body.refreshToken);

  return NextResponse.json(result);
}
