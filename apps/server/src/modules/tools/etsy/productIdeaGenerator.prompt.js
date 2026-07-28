export function buildPrompt({ niche, skills = "", budget = "" }) {
  const systemPrompt =
    "You are an Etsy product research strategist who identifies low-competition, high-demand " +
    "product opportunities grounded in real buyer behavior, not generic ideas. " +
    "Respond ONLY with valid JSON, no prose, no markdown fences.";

  const userPrompt = `Generate 8 Etsy product ideas as JSON under the key "ideas", where each idea is an object with
"name", "whyItWorks", and "estimatedDifficulty" ("low"|"medium"|"high").
Niche: ${niche}
Seller's skills/equipment: ${skills}
Budget level: ${budget}

Respond as: {"ideas": [{"name":"...","whyItWorks":"...","estimatedDifficulty":"low"}]}`;

  return { systemPrompt, userPrompt };
}
