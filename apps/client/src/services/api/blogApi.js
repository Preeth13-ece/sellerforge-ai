import { axiosClient } from "./axiosClient.js";

export const blogApi = {
  list: (params) => axiosClient.get("/blog", { params }),
  getBySlug: (slug) => axiosClient.get(`/blog/${slug}`),
  categories: () => axiosClient.get("/blog/categories"),
};
