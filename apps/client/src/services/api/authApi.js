import { axiosClient } from "./axiosClient.js";

export const authApi = {
  signup: (payload) => axiosClient.post("/auth/signup", payload),
  login: (payload) => axiosClient.post("/auth/login", payload),
  logout: () => axiosClient.post("/auth/logout"),
  refreshToken: () => axiosClient.post("/auth/refresh-token"),
  verifyEmail: (token) => axiosClient.get(`/auth/verify-email/${token}`),
  resendVerification: (email) => axiosClient.post("/auth/resend-verification", { email }),
  forgotPassword: (email) => axiosClient.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => axiosClient.post(`/auth/reset-password/${token}`, { password }),
  getMe: () => axiosClient.get("/users/me"),
};
