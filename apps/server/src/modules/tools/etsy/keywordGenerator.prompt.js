export function buildPrompt({ productType, niche = "", audience = "" }) {
  const systemPrompt =
    "You are an Etsy keyword research analyst. You surface realistic long-tail and short-tail " +
    "search phrases buyers actually type into Etsy, grouped by search intent. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Generate Etsy buyer search keywords as JSON with keys "shortTail" (5 items),
"longTail" (10 items), and "seasonal" (5 items, only if genuinely seasonal, else empty array).
Product type: ${productType}
Niche: ${niche}
Audience: ${audience}

Respond as: {"shortTail": [...], "longTail": [...], "seasonal": [...]}`;

  return { systemPrompt, userPrompt };
}
