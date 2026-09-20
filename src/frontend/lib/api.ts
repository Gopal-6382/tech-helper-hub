type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {

  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

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
    console.error("API Error Response:", {
      status: response.status,
      url: response.url,
      payload: result,
    });

    throw new Error(
      result?.message || `Request failed with status ${response.status}`,
    );
  }

  return result as ApiResponse<T>;
}
