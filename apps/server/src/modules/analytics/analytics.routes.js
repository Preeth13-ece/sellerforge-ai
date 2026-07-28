import { Router } from "express";
import { optionalAuth, verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import { logEvent, getSummary } from "./analytics.controller.js";

const router = Router();

router.post("/event", optionalAuth, logEvent);
router.get("/summary", verifyJWT, requireRole("admin"), getSummary);

export default router;
