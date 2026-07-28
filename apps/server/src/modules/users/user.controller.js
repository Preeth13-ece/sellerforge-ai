import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
  return new ApiResponse(200, { user: req.user }).send(res);
});

export const updateMe = asyncHandler(async (req, res) => {
  const { name, avatarUrl } = req.body;
  const update = {};
  if (name) update.name = name;
  if (avatarUrl !== undefined) update.avatarUrl = avatarUrl;

  const user = await User.findByIdAndUpdate(req.user._id, update, {
    new: true,
    runValidators: true,
  });
  return new ApiResponse(200, { user }, "Profile updated").send(res);
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+passwordHash");

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) throw ApiError.badRequest("Current password is incorrect");

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.refreshTokens = [];
  await user.save();

  return new ApiResponse(200, null, "Password changed. Please log in again.").send(res);
});

export const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { status: "deleted", refreshTokens: [] });
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });
  return new ApiResponse(200, null, "Account deleted").send(res);
});
