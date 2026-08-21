import { errorResponse } from "./api-response";

export function handleApiError(error: unknown) {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Internal Server Error";

  return errorResponse(message, 500);
}