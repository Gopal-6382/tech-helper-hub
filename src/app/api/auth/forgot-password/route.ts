import { NextRequest, NextResponse } from "next/server";

import { forgotPasswordAction } from "@/modules/auth/actions/forgot-password.action";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await forgotPasswordAction(body);

  return NextResponse.json(result);
}
