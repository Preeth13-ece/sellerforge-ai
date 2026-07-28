export function buildPrompt({ productType, keywords = "", audience = "" }) {
  const systemPrompt =
    "You are an Etsy SEO tag strategist. Etsy allows exactly 13 tags, each up to 20 characters, " +
    "multi-word phrases preferred over single words, no duplicate root words across tags. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Generate exactly 13 Etsy tags (each <= 20 characters) as a JSON array under the key "tags".
Product type: ${productType}
Target keywords: ${keywords}
Target audience: ${audience}

Respond as: {"tags": ["...", "... up to 13 items"]}`;

  return { systemPrompt, userPrompt };
}
