// frontend/features/posts/api/post-upload-api.ts

import { apiRequest } from "@/frontend/lib/api";

export async function uploadPostImages(files: File[]): Promise<string[]> {
  const formData = new FormData();

  for (const file of files) {
    formData.append("postImages", file);
  }

  const response = await apiRequest<{ images: string[] }>("/api/uploads/post", {
    method: "POST",
    body: formData,
  });

  return response.data?.images ?? [];
}
