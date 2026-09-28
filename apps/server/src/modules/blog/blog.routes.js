import { Router } from "express";
import { verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import {
  listPosts,
  getPostBySlug,
  listCategories,
  createPost,
  updatePost,
  deletePost,
  rssFeed,
} from "./blog.controller.js";

const router = Router();

router.get("/", listPosts);
router.get("/categories", listCategories);
router.get("/rss.xml", rssFeed);
router.get("/:slug", getPostBySlug);

router.post("/", verifyJWT, requireRole("admin"), createPost);
router.patch("/:id", verifyJWT, requireRole("admin"), updatePost);
router.delete("/:id", verifyJWT, requireRole("admin"), deletePost);

export default router;
