import { axiosClient } from "./axiosClient.js";

export const dashboardApi = {
  history: (params) => axiosClient.get("/history", { params }),
  deleteHistoryItem: (id) => axiosClient.delete(`/history/${id}`),
  clearHistory: () => axiosClient.delete("/history"),

  favorites: () => axiosClient.get("/favorites"),
  addFavorite: (payload) => axiosClient.post("/favorites", payload),
  removeFavorite: (id) => axiosClient.delete(`/favorites/${id}`),

  downloads: () => axiosClient.get("/downloads"),
  createDownload: (payload) => axiosClient.post("/downloads", payload),

  updateProfile: (payload) => axiosClient.patch("/users/me", payload),
  updatePassword: (payload) => axiosClient.patch("/users/me/password", payload),

  plans: () => axiosClient.get("/subscriptions/plans"),
  mySubscription: () => axiosClient.get("/subscriptions/me"),
  checkout: (planId) => axiosClient.post("/subscriptions/checkout", { planId }),
  cancelSubscription: () => axiosClient.post("/subscriptions/cancel"),
};
