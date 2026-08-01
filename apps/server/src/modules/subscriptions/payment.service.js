import Razorpay from "razorpay";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../users/user.model.js";
import { Subscription } from "./subscription.model.js";

let razorpayClient = null;

function getRazorpay() {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw ApiError.internal("Razorpay is not configured.");
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: env.razorpay.keyId,
      key_secret: env.razorpay.keySecret,
    });
  }

  return razorpayClient;
}


export const PLANS = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    credits: env.credits.free,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    credits: env.credits.pro,
    razorpayPlanId: env.razorpay.planPro,
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 99,
    credits: env.credits.business,
    razorpayPlanId: env.razorpay.planBusiness,
  },
];


export async function createCheckoutSession(user, planId) {

  const plan = PLANS.find((p) => p.id === planId);

  if (!plan || !plan.razorpayPlanId) {
    throw ApiError.badRequest("Invalid plan selected");
  }


  const razorpay = getRazorpay();


  const subscription = await razorpay.subscriptions.create({
    plan_id: plan.razorpayPlanId,

    customer_notify: 1,

    total_count: 1200,

    notes: {
      userId: user._id.toString(),
      planId,
    },
  });


  return subscription;
}



export async function handleWebhookEvent(event) {

  switch (event.event) {


    case "subscription.charged": {

      const subscription = event.payload.subscription.entity;

      const userId = subscription.notes?.userId;
      const planId = subscription.notes?.planId;


      if (userId && planId) {

        await User.findByIdAndUpdate(
          userId,
          {
            plan: planId,
            "credits.limit": env.credits[planId] ?? env.credits.free,
          }
        );


        await Subscription.findOneAndUpdate(
          { userId },

          {
            plan: planId,
            providerCustomerId: subscription.customer_id,
            providerSubscriptionId: subscription.id,
            status: "active",
          },

          { upsert: true }
        );
      }

      break;
    }



    case "subscription.cancelled": {

      const subscription = event.payload.subscription.entity;


      const record =
        await Subscription.findOne({
          providerSubscriptionId: subscription.id
        });


      if (record) {

        record.status = "canceled";
        record.plan = "free";

        await record.save();


        await User.findByIdAndUpdate(
          record.userId,
          {
            plan: "free",
            "credits.limit": env.credits.free,
          }
        );
      }

      break;
    }


    default:
      break;

  }


  return {
    received: true
  };

}





export async function cancelSubscription(user) {


  const record =
    await Subscription.findOne({
      userId: user._id
    });



  if (!record || !record.providerSubscriptionId) {

    throw ApiError.badRequest(
      "No active subscription to cancel"
    );

  }



  const razorpay = getRazorpay();


  await razorpay.subscriptions.cancel(
    record.providerSubscriptionId
  );



  record.status = "canceled";
  record.plan = "free";


  await record.save();



  await User.findByIdAndUpdate(
    user._id,

    {
      plan: "free",
      "credits.limit": env.credits.free,
    }
  );

}