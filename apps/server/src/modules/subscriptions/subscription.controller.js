import { Subscription } from "./subscription.model.js";
import * as paymentService from "./payment.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listPlans = asyncHandler(async (req, res) => {
  return new ApiResponse(200, { plans: paymentService.PLANS }).send(res);
});

export const createCheckout = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const url = await paymentService.createCheckoutSession(req.user, planId);
  return new ApiResponse(200, { url }, "Checkout session created").send(res);
});

export const stripeWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const result = await paymentService.handleWebhookEvent(req.body, signature);
  return res.status(200).json(result);
});

export const getMySubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.user._id });
  return new ApiResponse(200, {
    subscription: subscription || { plan: req.user.plan, status: "active" },
  }).send(res);
});

export const cancelMySubscription = asyncHandler(async (req, res) => {
  await paymentService.cancelSubscription(req.user);
  return new ApiResponse(200, null, "Subscription cancelled").send(res);
});
