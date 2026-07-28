import { AffiliateClick } from "./affiliateClick.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

// Known partners — future integrations wire real API credentials here without
// touching this route's shape.
const KNOWN_PARTNERS = [
  "creative-fabrica",
  "canva",
  "printify",
  "printful",
  "everbee",
  "marmalead",
  "erank",
  "hostinger",
];

export const logClick = asyncHandler(async (req, res) => {
  const { affiliateProduct, affiliateLink, source } = req.body;
  if (!affiliateProduct || !affiliateLink) {
    throw ApiError.badRequest("affiliateProduct and affiliateLink are required");
  }

  const click = await AffiliateClick.create({
    affiliateProduct,
    affiliateLink,
    source,
    userId: req.user?._id,
  });

  return new ApiResponse(201, { click, redirectUrl: affiliateLink }, "Click logged").send(res);
});

export const listClicks = asyncHandler(async (req, res) => {
  const { product } = req.query;
  const filter = product ? { affiliateProduct: product } : {};

  const clicks = await AffiliateClick.find(filter).sort({ clickedAt: -1 }).limit(500);

  const summary = await AffiliateClick.aggregate([
    { $group: { _id: "$affiliateProduct", totalClicks: { $sum: 1 } } },
    { $sort: { totalClicks: -1 } },
  ]);

  return new ApiResponse(200, { clicks, summary, knownPartners: KNOWN_PARTNERS }).send(res);
});
