export function buildPrompt({ niche, style = "", keywords = "" }) {
  const systemPrompt =
    "You are a branding expert specializing in Etsy shop names. Names must be memorable, " +
    "easy to spell and say aloud, available-sounding (not generic), and ideally <= 20 characters " +
    "since Etsy shop names cannot contain spaces. Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Generate 10 Etsy shop name ideas as JSON under the key "names" (array of strings, no spaces, each <= 20 characters).
Niche: ${niche}
Style/vibe: ${style}
Keywords to draw inspiration from: ${keywords}

Respond as: {"names": ["...", "... up to 10 items"]}`;

  return { systemPrompt, userPrompt };
}
