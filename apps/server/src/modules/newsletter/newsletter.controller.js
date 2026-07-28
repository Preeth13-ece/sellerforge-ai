import { Subscriber } from "./subscriber.model.js";
import * as newsletterService from "./newsletter.service.js";
import { toCSV } from "../../services/export/csvExportService.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const subscribeHandler = asyncHandler(async (req, res) => {
  const { email, name, source } = req.body;
  if (!email) throw ApiError.badRequest("Email is required");
  await newsletterService.subscribe({ email, name, source });
  return new ApiResponse(201, null, "Subscribed! Check your inbox for a welcome email.").send(res);
});

export const unsubscribeHandler = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw ApiError.badRequest("Email is required");
  await newsletterService.unsubscribe(email);
  return new ApiResponse(200, null, "You have been unsubscribed").send(res);
});

// ---- Admin ----

export const listSubscribers = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 50);
  const { search, status } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (search) filter.email = { $regex: search, $options: "i" };

  const [subscribers, total] = await Promise.all([
    Subscriber.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Subscriber.countDocuments(filter),
  ]);

  return new ApiResponse(200, {
    subscribers,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  }).send(res);
});

export const exportSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 }).lean();
  const csv = toCSV(
    subscribers.map((s) => ({
      email: s.email,
      name: s.name,
      source: s.source,
      status: s.status,
      subscribedAt: s.subscribedAt?.toISOString(),
    }))
  );
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="subscribers.csv"');
  res.send(csv);
});

export const deleteSubscriber = asyncHandler(async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  return new ApiResponse(200, null, "Subscriber deleted").send(res);
});
