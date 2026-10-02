import { apiRequest } from "@/frontend/lib/api";

export const postLikeApi = {
  async likePost(postId: string) {
    return apiRequest(`/api/postlikes/${postId}`, {
      method: "POST",
    });
  },

  async unlikePost(postId: string) {
    return apiRequest(`/api/postlikes/${postId}`, {
      method: "DELETE",
    });
  },

  async getPostLikes(postId: string) {
    return apiRequest(`/api/postlikes/${postId}`, {
      method: "GET",
    });
  },
};