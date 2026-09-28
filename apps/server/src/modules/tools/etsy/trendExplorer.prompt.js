export function buildPrompt({ niche }) {
  const systemPrompt =
    "You are an Etsy trend analyst. Based on general e-commerce and craft/design trend knowledge, " +
    "you describe plausible current and emerging trends within a niche, being clear these are " +
    "directional insights, not live marketplace data. Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Describe trend directions for this Etsy niche as JSON with keys:
"risingTrends" (array of {"trend","description"}), "colorsAndStyles" (array of strings),
"watchouts" (array of strings — things that may be cooling off).
Niche: ${niche}

Respond as: {"risingTrends":[{"trend":"...","description":"..."}],"colorsAndStyles":["..."],"watchouts":["..."]}`;

  return { systemPrompt, userPrompt };
}
