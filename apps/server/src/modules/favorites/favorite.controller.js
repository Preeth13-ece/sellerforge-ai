import { Favorite } from "./favorite.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const listFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return new ApiResponse(200, { favorites }).send(res);
});

export const createFavorite = asyncHandler(async (req, res) => {
  const { historyId, toolId, label, data } = req.body;
  if (!toolId || !label) throw ApiError.badRequest("toolId and label are required");
  const favorite = await Favorite.create({ userId: req.user._id, historyId, toolId, label, data });
  return new ApiResponse(201, { favorite }, "Saved to favorites").send(res);
});

export const deleteFavorite = asyncHandler(async (req, res) => {
  await Favorite.deleteOne({ _id: req.params.id, userId: req.user._id });
  return new ApiResponse(200, null, "Removed from favorites").send(res);
});
