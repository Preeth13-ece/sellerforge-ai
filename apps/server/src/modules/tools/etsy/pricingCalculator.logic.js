/**
 * Suggests a retail price given costs and a target profit margin.
 * Pure calculation — no AI call, so it's instant and free (no credit cost).
 */
export function calculatePricing({
  materialCost = 0,
  laborHours = 0,
  hourlyRate = 15,
  overheadCost = 0,
  desiredProfitMarginPercent = 30,
  etsyTransactionFeePercent = 6.5,
  etsyPaymentProcessingPercent = 3,
  etsyPaymentProcessingFlatFee = 0.25,
  etsyListingFee = 0.2,
}) {
  const laborCost = Number(laborHours) * Number(hourlyRate);
  const baseCost = Number(materialCost) + laborCost + Number(overheadCost) + Number(etsyListingFee);

  const feePercent =
    (Number(etsyTransactionFeePercent) + Number(etsyPaymentProcessingPercent)) / 100;
  const marginDecimal = Number(desiredProfitMarginPercent) / 100;

  // Solve: price = (baseCost + flatFee) / (1 - feePercent - marginDecimal)
  const denominator = 1 - feePercent - marginDecimal;
  const suggestedPrice =
    denominator > 0
      ? (baseCost + Number(etsyPaymentProcessingFlatFee)) / denominator
      : baseCost * 2; // fallback safety net if inputs are unrealistic

  const roundedPrice = Math.ceil(suggestedPrice * 100) / 100 - 0.01; // charm pricing e.g. 24.99
  const finalPrice = roundedPrice > 0 ? roundedPrice : suggestedPrice;

  const estimatedFees =
    finalPrice * feePercent + Number(etsyPaymentProcessingFlatFee) + Number(etsyListingFee);
  const estimatedProfit = finalPrice - baseCost - estimatedFees + Number(etsyListingFee); // listingFee already in baseCost

  return {
    suggestedPrice: Number(finalPrice.toFixed(2)),
    breakdown: {
      materialCost: Number(materialCost),
      laborCost: Number(laborCost.toFixed(2)),
      overheadCost: Number(overheadCost),
      listingFee: Number(etsyListingFee),
      estimatedEtsyFees: Number(estimatedFees.toFixed(2)),
      estimatedProfit: Number(estimatedProfit.toFixed(2)),
      effectiveMarginPercent: Number(((estimatedProfit / finalPrice) * 100).toFixed(1)),
    },
  };
}
