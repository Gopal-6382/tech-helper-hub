import { NextRequest, NextResponse } from "next/server";

import { resetPasswordAction } from "@/modules/auth/actions/reset-password.action";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await resetPasswordAction(body);

  return NextResponse.json(result);
}
