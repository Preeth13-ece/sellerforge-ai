import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toolId: { type: String, required: true },
    toolName: { type: String, required: true },
    marketplace: { type: String, default: "etsy" },
    input: { type: mongoose.Schema.Types.Mixed },
    output: { type: mongoose.Schema.Types.Mixed },
    creditsCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

historySchema.index({ userId: 1, createdAt: -1 });

export const History = mongoose.model("History", historySchema);
