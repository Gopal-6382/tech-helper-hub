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

  const headers = new Headers(options.headers);

  const isFormData = options.body instanceof FormData;

  if (isFormData) {
    // Let the browser set:
    // Content-Type: multipart/form-data; boundary=...
    headers.delete("Content-Type");
  } else if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
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
