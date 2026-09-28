import { GeminiProvider } from "./GeminiProvider.js";
import { toolRegistry } from "../../modules/tools/toolRegistry.js";
import { ApiError } from "../../utils/ApiError.js";

const provider = new GeminiProvider();

function extractJSON(rawText) {
  // AI responses may wrap JSON in prose or code fences — pull out the first
  // valid JSON object/array we can find.
  const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1] : rawText;
  const firstBrace = Math.min(
    ...["{", "["].map((c) => (candidate.indexOf(c) === -1 ? Infinity : candidate.indexOf(c)))
  );
  const lastBrace = Math.max(candidate.lastIndexOf("}"), candidate.lastIndexOf("]"));
  const jsonSlice =
    firstBrace !== Infinity && lastBrace !== -1 ? candidate.slice(firstBrace, lastBrace + 1) : candidate;

  try {
    return JSON.parse(jsonSlice);
  } catch {
    throw ApiError.internal("AI provider returned an unparseable response. Please try again.");
  }
}

export const AIService = {
  /**
   * Runs a registered AI-backed tool.
   * @param {string} toolId - e.g. "etsy-title-generator"
   * @param {object} input - user-supplied form data
   */
  async generate(toolId, input) {
    const tool = toolRegistry[toolId];
    if (!tool) throw ApiError.badRequest(`Unknown tool: ${toolId}`);
    if (tool.kind !== "ai") throw ApiError.badRequest(`${toolId} is not an AI tool`);

    const { systemPrompt, userPrompt } = tool.buildPrompt(input);
    const rawText = await provider.complete(systemPrompt, userPrompt);
    const parsed = extractJSON(rawText);
    return parsed;
  },
};
