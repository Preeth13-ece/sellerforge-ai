import mongoose from "mongoose";

const affiliateClickSchema = new mongoose.Schema(
  {
    affiliateProduct: { type: String, required: true, index: true },
    affiliateLink: { type: String, required: true },
    clickedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    source: { type: String, default: "" },
  },
  { timestamps: true }
);

affiliateClickSchema.index({ affiliateProduct: 1, clickedAt: -1 });

export const AffiliateClick = mongoose.model("AffiliateClick", affiliateClickSchema);
