import { verifyAccessToken } from "../utils/tokenUtils.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modules/users/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) throw ApiError.unauthorized("Authentication required");

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  const user = await User.findById(decoded.sub).select("-passwordHash -refreshTokens");
  if (!user || user.status !== "active") {
    throw ApiError.unauthorized("Account is not accessible");
  }

  req.user = user;
  next();
});

// Attaches req.user if a valid token is present, but never blocks the request.
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();
  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.sub).select("-passwordHash -refreshTokens");
    if (user && user.status === "active") req.user = user;
  } catch {
    // ignore invalid token for optional auth
  }
  next();
});

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(ApiError.forbidden("You do not have permission to perform this action"));
  }
  next();
};
