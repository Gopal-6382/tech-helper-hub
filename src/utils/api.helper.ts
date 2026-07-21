// api-handler.ts
import { NextResponse } from "next/server";
export async function handleRequest(fn: () => Promise<unknown>) {
  try {
    const data = await fn();

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}