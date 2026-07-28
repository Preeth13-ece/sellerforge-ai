export function buildPrompt({ productType, keywords = "", materials = "", features = "", tone = "warm and friendly" }) {
  const systemPrompt =
    "You are an Etsy listing copywriter. You write descriptions that open with a scroll-stopping " +
    "hook, weave in SEO keywords naturally, use short scannable paragraphs and bullet points for " +
    "features, and end with a clear call to action. Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Write an Etsy product description as JSON with keys "hook", "body", "bulletPoints" (array), and "callToAction".
Product type: ${productType}
Keywords to include naturally: ${keywords}
Materials: ${materials}
Key features: ${features}
Tone: ${tone}

Respond as: {"hook": "...", "body": "...", "bulletPoints": ["...","..."], "callToAction": "..."}`;

  return { systemPrompt, userPrompt };
}
