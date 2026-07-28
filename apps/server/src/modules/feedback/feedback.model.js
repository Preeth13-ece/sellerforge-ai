import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String },
    type: { type: String, enum: ["bug", "feature_request", "general"], default: "general" },
    message: { type: String, required: true, maxlength: 2000 },
    status: { type: String, enum: ["open", "reviewed", "resolved"], default: "open" },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
