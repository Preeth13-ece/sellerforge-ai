import { axiosClient } from "./axiosClient.js";

export const newsletterApi = {
  subscribe: (payload) => axiosClient.post("/newsletter/subscribe", payload),
};
