import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/modules/auth/validations/auth.schema";
import { AuthService } from "@/modules/auth/services/auth.service";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = registerSchema.parse(body);

    const result = await authService.register(data);

    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}