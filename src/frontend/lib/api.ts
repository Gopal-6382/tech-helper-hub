import { toast } from "@/frontend/components/ui/toast";

type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      result?.message || `Request failed with status ${response.status}`;

    if (typeof window !== "undefined") {
      toast.add({
        type: "error",
        title: errorMessage,
        description:
          response.status >= 500
            ? "Please try again later."
            : response.status === 401
              ? "Please log in again."
              : undefined,
        timeout: 5000,
      });
    }

    console.error("API Error Response:", {
      status: response.status,
      url: response.url,
      payload: result,
    });

    throw new Error(errorMessage);
  }

  return result as ApiResponse<T>;
}
