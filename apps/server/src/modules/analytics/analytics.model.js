import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

analyticsSchema.index({ eventType: 1, createdAt: -1 });

export const AnalyticsEvent = mongoose.model("AnalyticsEvent", analyticsSchema);
