import { apiRequest } from "@/frontend/lib/api";

export const postViewApi = {
  async viewPost(postId: string) {
    return apiRequest(`/api/posts/${postId}/view`, {
      method: "POST",
    });
  },
};