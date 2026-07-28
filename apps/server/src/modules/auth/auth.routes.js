import { Router } from "express";
import { authLimiter } from "../../config/rateLimit.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "./auth.validation.js";
import {
  signupHandler,
  loginHandler,
  refreshTokenHandler,
  logoutHandler,
  verifyEmailHandler,
  resendVerificationHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "./auth.controller.js";

const router = Router();

router.post("/signup", authLimiter, signupValidation, validateRequest, signupHandler);
router.post("/login", authLimiter, loginValidation, validateRequest, loginHandler);
router.post("/refresh-token", refreshTokenHandler);
router.post("/logout", verifyJWT, logoutHandler);
router.get("/verify-email/:token", verifyEmailHandler);
router.post("/resend-verification", authLimiter, resendVerificationHandler);
router.post(
  "/forgot-password",
  authLimiter,
  forgotPasswordValidation,
  validateRequest,
  forgotPasswordHandler
);
router.post(
  "/reset-password/:token",
  authLimiter,
  resetPasswordValidation,
  validateRequest,
  resetPasswordHandler
);

export default router;
