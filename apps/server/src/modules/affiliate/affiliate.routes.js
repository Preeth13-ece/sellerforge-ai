import { Router } from "express";
import { optionalAuth, verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import { logClick, listClicks } from "./affiliate.controller.js";

const router = Router();

router.post("/click", optionalAuth, logClick);
router.get("/clicks", verifyJWT, requireRole("admin"), listClicks);

export default router;
