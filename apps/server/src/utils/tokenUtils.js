import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export function signAccessToken(payload) {
  return jwt.sign(
    payload,
    env.jwt.accessSecret,
    {
      expiresIn: env.jwt.accessExpiresIn,
    }
  );
}


export function signRefreshToken(payload) {
  return jwt.sign(
    payload,
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn,
    }
  );
}


export function verifyAccessToken(token) {
  return jwt.verify(
    token,
    env.jwt.accessSecret
  );
}


export function verifyRefreshToken(token) {
  return jwt.verify(
    token,
    env.jwt.refreshSecret
  );
}


export function generateRandomToken() {
  return crypto
    .randomBytes(32)
    .toString("hex");
}


export function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}


// Refresh token cookie settings
// Required for:
// Cloudflare Pages frontend
// +
// Render backend API

export function refreshCookieOptions() {
  return {
    httpOnly: true,

    // HTTPS only in production
    secure: true,

    // Allow cookie between different domains
    sameSite: "none",

    // Available for all API routes
    path: "/",

    maxAge:
      30 *
      24 *
      60 *
      60 *
      1000,
  };
}
