import { NextResponse } from "next/server";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}
export function handleApiError(error: unknown) {
  console.error(error);
  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return errorResponse(message, 500);
}
