import { Router } from "express";
import { optionalAuth, verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import { submitFeedback, listFeedback, updateFeedbackStatus } from "./feedback.controller.js";

const router = Router();

router.post("/", optionalAuth, submitFeedback);
router.get("/", verifyJWT, requireRole("admin"), listFeedback);
router.patch("/:id", verifyJWT, requireRole("admin"), updateFeedbackStatus);

export default router;
