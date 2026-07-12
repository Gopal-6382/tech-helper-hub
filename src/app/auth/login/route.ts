import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../../../modules/auth/validations/auth.schema";
import { AuthService } from "../../../modules/auth/services/auth.service";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = loginSchema.parse(body);

    const user = await authService.login(data);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 401 },
    );
  }
}
