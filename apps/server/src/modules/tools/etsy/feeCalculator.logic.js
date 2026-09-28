/**
 * Breaks down Etsy's fees for a given sale price so sellers know their real take-home.
 * Pure calculation — no AI call.
 */
export function calculateFees({
  salePrice = 0,
  shippingPrice = 0,
  quantity = 1,
  hasOfferOrEtsyAds = false,
  etsyAdsPercent = 15,
  transactionFeePercent = 6.5,
  paymentProcessingPercent = 3,
  paymentProcessingFlatFee = 0.25,
  listingFeePerItem = 0.2,
  isOffsiteAds = false,
  offsiteAdsPercent = 15,
}) {
  const gross = (Number(salePrice) + Number(shippingPrice)) * Number(quantity);

  const transactionFee = gross * (Number(transactionFeePercent) / 100);
  const paymentProcessingFee =
    gross * (Number(paymentProcessingPercent) / 100) + Number(paymentProcessingFlatFee);
  const listingFee = Number(listingFeePerItem) * Number(quantity);
  const adsFee = hasOfferOrEtsyAds ? gross * (Number(etsyAdsPercent) / 100) : 0;
  const offsiteAdsFee = isOffsiteAds ? gross * (Number(offsiteAdsPercent) / 100) : 0;

  const totalFees = transactionFee + paymentProcessingFee + listingFee + adsFee + offsiteAdsFee;
  const netEarnings = gross - totalFees;

  return {
    grossRevenue: Number(gross.toFixed(2)),
    fees: {
      transactionFee: Number(transactionFee.toFixed(2)),
      paymentProcessingFee: Number(paymentProcessingFee.toFixed(2)),
      listingFee: Number(listingFee.toFixed(2)),
      etsyAdsFee: Number(adsFee.toFixed(2)),
      offsiteAdsFee: Number(offsiteAdsFee.toFixed(2)),
      totalFees: Number(totalFees.toFixed(2)),
    },
    netEarnings: Number(netEarnings.toFixed(2)),
    netMarginPercent: gross > 0 ? Number(((netEarnings / gross) * 100).toFixed(1)) : 0,
  };
}
