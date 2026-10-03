import { apiRequest } from "@/frontend/lib/api";

export const postSaveApi = {
  async savePost(postId: string) {
    return apiRequest(`/api/saveposts/${postId}`, {
      method: "POST",
    });
  },

  async unsavePost(postId: string) {
    return apiRequest(`/api/saveposts/${postId}`, {
      method: "DELETE",
    });
  },

  async getSavedPosts() {
    return apiRequest("/api/saveposts", {
      method: "GET",
    });
  },
};
