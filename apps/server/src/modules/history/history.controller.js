import { History } from "./history.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const getHistory = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);
  const toolId = req.query.toolId;

  const filter = { userId: req.user._id, ...(toolId && { toolId }) };
  const [items, total] = await Promise.all([
    History.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    History.countDocuments(filter),
  ]);

  return new ApiResponse(200, {
    items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }).send(res);
});

export const getHistoryItem = asyncHandler(async (req, res) => {
  const item = await History.findOne({ _id: req.params.id, userId: req.user._id });
  if (!item) throw ApiError.notFound("History item not found");
  return new ApiResponse(200, { item }).send(res);
});

export const deleteHistoryItem = asyncHandler(async (req, res) => {
  await History.deleteOne({ _id: req.params.id, userId: req.user._id });
  return new ApiResponse(200, null, "Deleted").send(res);
});

export const clearHistory = asyncHandler(async (req, res) => {
  await History.deleteMany({ userId: req.user._id });
  return new ApiResponse(200, null, "History cleared").send(res);
});
