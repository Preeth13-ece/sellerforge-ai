import { User } from "../users/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const listUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 50);
  const { search } = req.query;

  const filter = { status: { $ne: "deleted" } };
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return new ApiResponse(200, {
    users,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }).send(res);
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) throw ApiError.badRequest("Invalid role");

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) throw ApiError.notFound("User not found");

  return new ApiResponse(200, { user }, "Role updated").send(res);
});

export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "suspended" });
  return new ApiResponse(200, null, "User suspended").send(res);
});
