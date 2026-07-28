import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    historyId: { type: mongoose.Schema.Types.ObjectId, ref: "History" },
    toolId: { type: String, required: true },
    label: { type: String, required: true, trim: true, maxlength: 120 },
    data: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
