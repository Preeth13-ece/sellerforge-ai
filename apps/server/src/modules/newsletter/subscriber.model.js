import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, default: "" },
    source: {
      type: String,
      enum: ["home", "tool", "blog", "footer", "exit_popup", "free_download", "dashboard"],
      default: "footer",
    },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["subscribed", "unsubscribed"], default: "subscribed" },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
