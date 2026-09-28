import { AnalyticsEvent } from "./analytics.model.js";
import { User } from "../users/user.model.js";
import { Subscriber } from "../newsletter/subscriber.model.js";
import { History } from "../history/history.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const logEvent = asyncHandler(async (req, res) => {
  const { eventType, metadata } = req.body;
  if (!eventType) throw ApiError.badRequest("eventType is required");
  await AnalyticsEvent.create({ eventType, metadata, userId: req.user?._id });
  return new ApiResponse(201, null, "Event logged").send(res);
});

export const getSummary = asyncHandler(async (req, res) => {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [totalUsers, newUsers30d, totalSubscribers, toolRuns30d, planBreakdown] = await Promise.all([
    User.countDocuments({ status: { $ne: "deleted" } }),
    User.countDocuments({ createdAt: { $gte: since }, status: { $ne: "deleted" } }),
    Subscriber.countDocuments({ status: "subscribed" }),
    History.countDocuments({ createdAt: { $gte: since } }),
    User.aggregate([
      { $match: { status: { $ne: "deleted" } } },
      { $group: { _id: "$plan", count: { $sum: 1 } } },
    ]),
  ]);

  const topTools = await History.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: "$toolId", runs: { $sum: 1 } } },
    { $sort: { runs: -1 } },
    { $limit: 5 },
  ]);

  return new ApiResponse(200, {
    totalUsers,
    newUsers30d,
    totalSubscribers,
    toolRuns30d,
    planBreakdown,
    topTools,
  }).send(res);
});
