import { Subscription } from "./subscription.model.js";
import * as paymentService from "./payment.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export const listPlans = asyncHandler(async (req, res) => {

  return new ApiResponse(
    200,
    {
      plans: paymentService.PLANS,
    },
    "Plans fetched successfully"
  ).send(res);

});



export const createCheckout = asyncHandler(async (req, res) => {

  console.log("========== RAZORPAY CHECKOUT ==========");

  console.log("User:", req.user);

  console.log("Request body:", req.body);



  if (!req.user) {

    throw new Error("User not authenticated");

  }



  const { planId } = req.body;



  console.log("Selected plan:", planId);



  const subscription =
    await paymentService.createCheckoutSession(
      req.user,
      planId
    );



  console.log(
    "Razorpay subscription created:",
    subscription.id
  );



  return new ApiResponse(
    200,
    {
      subscription,
    },
    "Razorpay subscription created successfully"
  ).send(res);

});





export const razorpayWebhook = asyncHandler(async (req, res) => {


  console.log(
    "Razorpay webhook received"
  );


  const result =
    await paymentService.handleWebhookEvent(
      req.body
    );


  return res
    .status(200)
    .json(result);


});






export const getMySubscription = asyncHandler(async (req, res) => {


  const subscription =
    await Subscription.findOne({
      userId: req.user._id,
    });



  return new ApiResponse(
    200,
    {
      subscription:
        subscription || {
          plan: req.user.plan,
          status: "active",
        },
    },
    "Subscription fetched successfully"
  ).send(res);


});






export const cancelMySubscription = asyncHandler(async (req, res) => {


  await paymentService.cancelSubscription(
    req.user
  );


  return new ApiResponse(
    200,
    null,
    "Subscription cancelled successfully"
  ).send(res);


});
