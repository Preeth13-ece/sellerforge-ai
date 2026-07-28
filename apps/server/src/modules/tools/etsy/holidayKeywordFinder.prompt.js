export function buildPrompt({ niche, upcomingHolidayWindow = "next 6 months" }) {
  const systemPrompt =
    "You are an Etsy seasonal marketing strategist who maps product niches to upcoming holidays " +
    "and gift-giving occasions, with realistic shopper search phrases for each. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Identify relevant holidays/occasions in the ${upcomingHolidayWindow} for this niche, and buyer
search keywords for each, as JSON under the key "holidays" (array of objects with "holiday",
"suggestedListingAngle", and "keywords" [array]).
Niche: ${niche}

Respond as: {"holidays": [{"holiday":"...","suggestedListingAngle":"...","keywords":["..."]}]}`;

  return { systemPrompt, userPrompt };
}
