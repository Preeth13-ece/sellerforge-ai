import { axiosClient } from "./axiosClient.js";

export const toolsApi = {
  listTools: () => axiosClient.get("/tools"),
  run: (endpoint, payload) => axiosClient.post(`/tools/etsy/${endpoint}`, payload),
};
