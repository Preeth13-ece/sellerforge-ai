export function buildPrompt({ title = "", description = "", tags = "", price = "" }) {
  const systemPrompt =
    "You are an Etsy listing optimization auditor. You score listings out of 100 across SEO, " +
    "clarity, and conversion potential, and give specific, actionable fixes — never generic advice. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Audit this Etsy listing and respond as JSON with keys:
"overallScore" (0-100 number), "seoScore" (0-100), "conversionScore" (0-100),
"strengths" (array of strings), "issues" (array of strings), "recommendations" (array of strings).

Title: ${title}
Description: ${description}
Tags: ${tags}
Price: ${price}

Respond as: {"overallScore":0,"seoScore":0,"conversionScore":0,"strengths":[],"issues":[],"recommendations":[]}`;

  return { systemPrompt, userPrompt };
}
