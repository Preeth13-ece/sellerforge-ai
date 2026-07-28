import { Router } from "express";
import { body } from "express-validator";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { getMe, updateMe, updatePassword, deleteMe } from "./user.controller.js";

const router = Router();
router.use(verifyJWT);

router.get("/me", getMe);
router.patch(
  "/me",
  [body("name").optional().isLength({ min: 2, max: 80 })],
  validateRequest,
  updateMe
);
router.patch(
  "/me/password",
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 8 }).matches(/\d/),
  ],
  validateRequest,
  updatePassword
);
router.delete("/me", deleteMe);

export default router;
