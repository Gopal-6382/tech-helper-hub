import { NextRequest, NextResponse } from "next/server";
import { registerAction } from "@/modules/auth/actions/register.action";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await registerAction(body);

  return NextResponse.json(result, {
    status: 201,
  });
}
