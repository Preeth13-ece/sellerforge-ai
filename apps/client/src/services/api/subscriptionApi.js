import { axiosClient } from "./axiosClient.js";

export const subscriptionApi = {
  getPlans: () =>
    axiosClient.get("/subscriptions/plans"),

  createCheckout: (planId) =>
    axiosClient.post("/subscriptions/checkout", {
      planId,
    }),

  getMySubscription: () =>
    axiosClient.get("/subscriptions/me"),

  cancelSubscription: () =>
    axiosClient.post("/subscriptions/cancel"),
};
