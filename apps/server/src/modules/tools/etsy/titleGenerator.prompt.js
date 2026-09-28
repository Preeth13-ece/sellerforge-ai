export function buildPrompt({ productType, keywords = "", materials = "", style = "" }) {
  const systemPrompt =
    "You are an Etsy SEO copywriting expert. You write high-converting, keyword-rich Etsy " +
    "listing titles under 140 characters, front-loading the most important search terms, " +
    "using pipes or commas as separators, and never using ALL CAPS or emojis. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Generate 5 Etsy listing title options as a JSON array of strings under the key "titles".
Product type: ${productType}
Target keywords: ${keywords}
Materials: ${materials}
Style/aesthetic: ${style}

Each title must be <= 140 characters and optimized for Etsy search ranking.
Respond as: {"titles": ["...", "...", "...", "...", "..."]}`;

  return { systemPrompt, userPrompt };
}
