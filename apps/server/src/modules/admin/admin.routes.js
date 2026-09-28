import { Router } from "express";
import { verifyJWT, requireRole } from "../../middlewares/authMiddleware.js";
import { getSummary } from "../analytics/analytics.controller.js";
import { listUsers, updateUserRole, deleteUser } from "./admin.controller.js";

const router = Router();
router.use(verifyJWT, requireRole("admin"));

router.get("/overview", getSummary);
router.get("/users", listUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
