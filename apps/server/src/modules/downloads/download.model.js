import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sourceHistoryId: { type: mongoose.Schema.Types.ObjectId, ref: "History" },
    fileType: { type: String, enum: ["csv", "pdf", "txt"], required: true },
    fileName: { type: String, required: true },
    content: { type: String, required: true }, // stored inline for simplicity; swap for object storage at scale
  },
  { timestamps: true }
);

export const Download = mongoose.model("Download", downloadSchema);
