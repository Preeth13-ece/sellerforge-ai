import bcrypt from "bcryptjs";
import { User } from "../users/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  generateRandomToken,
  hashToken,
} from "../../utils/tokenUtils.js";
import { env } from "../../config/env.js";
import { emailService } from "../../services/email/EmailService.js";

const SALT_ROUNDS = 12;

function creditLimitForPlan(plan) {
  return env.credits[plan] ?? env.credits.free;
}

export async function signup({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const verifyToken = generateRandomToken();

  const user = await User.create({
    name,
    email,
    passwordHash,
    emailVerifyTokenHash: hashToken(verifyToken),
    emailVerifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    credits: { used: 0, limit: creditLimitForPlan("free") },
  });

  await emailService.sendVerificationEmail(user.email, user.name, verifyToken).catch(() => {});

  return user.toSafeJSON();
}

export async function login({ email, password, userAgent }) {
  const user = await User.findOne({ email }).select("+passwordHash +refreshTokens");
  if (!user) throw ApiError.unauthorized("Invalid email or password");
  if (user.status !== "active") throw ApiError.forbidden("This account is not active");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });

  user.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    userAgent: userAgent || "unknown",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  await user.save();

  return { user: user.toSafeJSON(), accessToken, refreshToken };
}

export async function refreshSession(refreshToken) {
  if (!refreshToken) throw ApiError.unauthorized("No refresh token provided");

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Session expired, please log in again");
  }

  const user = await User.findById(decoded.sub).select("+refreshTokens");
  if (!user) throw ApiError.unauthorized("Session invalid");

  const tokenHash = hashToken(refreshToken);
  const matches = user.refreshTokens.some((t) => t.tokenHash === tokenHash);
  if (!matches) throw ApiError.unauthorized("Session invalid, please log in again");

  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  return { accessToken, user: user.toSafeJSON() };
}

export async function logout(userId, refreshToken) {
  if (!userId || !refreshToken) return;
  const tokenHash = hashToken(refreshToken);
  await User.updateOne({ _id: userId }, { $pull: { refreshTokens: { tokenHash } } });
}

export async function verifyEmail(token) {
  const tokenHash = hashToken(token);
  const user = await User.findOne({
    emailVerifyTokenHash: tokenHash,
    emailVerifyExpires: { $gt: new Date() },
  }).select("+emailVerifyTokenHash");
  if (!user) throw ApiError.badRequest("Verification link is invalid or has expired");

  user.isEmailVerified = true;
  user.emailVerifyTokenHash = undefined;
  user.emailVerifyExpires = undefined;
  await user.save();
  return user.toSafeJSON();
}

export async function forgotPassword(email) {
  const user = await User.findOne({ email });
  // Always behave the same way to avoid leaking which emails are registered.
  if (!user) return;

  const resetToken = generateRandomToken();
  user.passwordResetTokenHash = hashToken(resetToken);
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  await emailService.sendPasswordResetEmail(user.email, user.name, resetToken).catch(() => {});
}

export async function resetPassword(token, newPassword) {
  const tokenHash = hashToken(token);
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  }).select("+passwordResetTokenHash +refreshTokens");
  if (!user) throw ApiError.badRequest("Reset link is invalid or has expired");

  user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  user.refreshTokens = []; // force re-login on all devices
  await user.save();
}

export async function resendVerification(email) {
  const user = await User.findOne({ email });
  if (!user || user.isEmailVerified) return;

  const verifyToken = generateRandomToken();
  user.emailVerifyTokenHash = hashToken(verifyToken);
  user.emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  await emailService.sendVerificationEmail(user.email, user.name, verifyToken).catch(() => {});
}
