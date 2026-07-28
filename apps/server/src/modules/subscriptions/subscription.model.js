import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    plan: { type: String, enum: ["free", "pro", "business"], default: "free" },
    provider: { type: String, enum: ["stripe"], default: "stripe" },
    providerCustomerId: { type: String },
    providerSubscriptionId: { type: String },
    status: {
      type: String,
      enum: ["active", "past_due", "canceled", "trialing", "incomplete"],
      default: "active",
    },
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
