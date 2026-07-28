import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { refreshCookieOptions } from "../../utils/tokenUtils.js";
import * as authService from "./auth.service.js";

export const signupHandler = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);
  return new ApiResponse(201, { user }, "Account created. Check your email to verify it.").send(res);
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login({
    email,
    password,
    userAgent: req.headers["user-agent"],
  });
  res.cookie("refreshToken", refreshToken, refreshCookieOptions());
  return new ApiResponse(200, { user, accessToken }, "Logged in successfully").send(res);
});

export const refreshTokenHandler = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken, user } = await authService.refreshSession(token);
  return new ApiResponse(200, { accessToken, user }, "Session refreshed").send(res);
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  await authService.logout(req.user?._id, token);
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });
  return new ApiResponse(200, null, "Logged out").send(res);
});

export const verifyEmailHandler = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.params.token);
  return new ApiResponse(200, { user }, "Email verified successfully").send(res);
});

export const resendVerificationHandler = asyncHandler(async (req, res) => {
  await authService.resendVerification(req.body.email);
  return new ApiResponse(200, null, "If that account exists, a new verification email was sent").send(res);
});

export const forgotPasswordHandler = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return new ApiResponse(200, null, "If that email exists, a reset link has been sent").send(res);
});

export const resetPasswordHandler = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  return new ApiResponse(200, null, "Password updated. You can now log in.").send(res);
});
