import { Feedback } from "./feedback.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const submitFeedback = asyncHandler(async (req, res) => {
  const { email, type, message } = req.body;
  if (!message) throw ApiError.badRequest("Message is required");

  const feedback = await Feedback.create({
    userId: req.user?._id,
    email: email || req.user?.email,
    type,
    message,
  });

  return new ApiResponse(201, { feedback }, "Thanks — we read every message.").send(res);
});

export const listFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find().sort({ createdAt: -1 }).limit(200);
  return new ApiResponse(200, { feedback }).send(res);
});

export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!feedback) throw ApiError.notFound("Feedback not found");
  return new ApiResponse(200, { feedback }, "Status updated").send(res);
});
