import Stripe from "stripe";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../users/user.model.js";
import { Subscription } from "./subscription.model.js";

let stripeClient = null;
function getStripe() {
  if (!env.stripe.secretKey) {
    throw ApiError.internal("Payments are not configured. Set STRIPE_SECRET_KEY.");
  }
  if (!stripeClient) stripeClient = new Stripe(env.stripe.secretKey);
  return stripeClient;
}

const PRICE_TO_PLAN = {
  [env.stripe.pricePro]: "pro",
  [env.stripe.priceBusiness]: "business",
};

export const PLANS = [
  { id: "free", name: "Free", priceMonthly: 0, credits: env.credits.free },
  { id: "pro", name: "Pro", priceMonthly: 19, credits: env.credits.pro, stripePriceId: env.stripe.pricePro },
  {
    id: "business",
    name: "Business",
    priceMonthly: 49,
    credits: env.credits.business,
    stripePriceId: env.stripe.priceBusiness,
  },
];

export async function createCheckoutSession(user, planId) {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan || !plan.stripePriceId) throw ApiError.badRequest("Invalid plan selected");

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${env.clientUrl}/dashboard/subscription?checkout=success`,
    cancel_url: `${env.clientUrl}/pricing?checkout=cancelled`,
    metadata: { userId: user._id.toString(), planId },
  });

  return session.url;
}

export async function handleWebhookEvent(rawBody, signature) {
  const stripe = getStripe();
  const event = stripe.webhooks.constructEvent(rawBody, signature, env.stripe.webhookSecret);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;
      if (userId && planId) {
        await User.findByIdAndUpdate(userId, {
          plan: planId,
          "credits.limit": env.credits[planId] ?? env.credits.free,
        });
        await Subscription.findOneAndUpdate(
          { userId },
          {
            plan: planId,
            providerCustomerId: session.customer,
            providerSubscriptionId: session.subscription,
            status: "active",
          },
          { upsert: true }
        );
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const record = await Subscription.findOne({ providerSubscriptionId: sub.id });
      if (record) {
        record.status = "canceled";
        record.plan = "free";
        await record.save();
        await User.findByIdAndUpdate(record.userId, {
          plan: "free",
          "credits.limit": env.credits.free,
        });
      }
      break;
    }
    default:
      break; // ignore other event types
  }

  return { received: true };
}

export async function cancelSubscription(user) {
  const record = await Subscription.findOne({ userId: user._id });
  if (!record || !record.providerSubscriptionId) {
    throw ApiError.badRequest("No active subscription to cancel");
  }
  const stripe = getStripe();
  await stripe.subscriptions.cancel(record.providerSubscriptionId);
  record.status = "canceled";
  record.plan = "free";
  await record.save();
  await User.findByIdAndUpdate(user._id, { plan: "free", "credits.limit": env.credits.free });
}
