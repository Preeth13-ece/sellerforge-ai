import { Router } from "express";
import { verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import {
  subscribeHandler,
  unsubscribeHandler,
  listSubscribers,
  exportSubscribers,
  deleteSubscriber,
} from "./newsletter.controller.js";

const router = Router();

router.post("/subscribe", subscribeHandler);
router.post("/unsubscribe", unsubscribeHandler);

router.get("/subscribers", verifyJWT, requireRole("admin"), listSubscribers);
router.get("/subscribers/export", verifyJWT, requireRole("admin"), exportSubscribers);
router.delete("/subscribers/:id", verifyJWT, requireRole("admin"), deleteSubscriber);

export default router;
