import { apiRequest } from "@/frontend/lib/api";

import type { Post } from "@/frontend/features/posts/types/post.types";
import type { UpdatePostStatusInput } from "@/modules/posts/validations/post.validation";

export const postApi = {
  async updatePostStatus(
    postId: string,
    data: UpdatePostStatusInput,
  ): Promise<Post> {
    console.log("[API] updatePostStatus data:", data);

    const response = await apiRequest<Post>(`/api/posts/${postId}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.data) {
      throw new Error("Failed to update post status");
    }

    return response.data;
  },
};
