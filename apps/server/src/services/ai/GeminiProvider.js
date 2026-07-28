import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import { AIProviderInterface } from "./AIProvider.interface.js";

export class GeminiProvider extends AIProviderInterface {
  async complete(systemPrompt, userPrompt) {
    if (!env.ai.geminiApiKey) {
      throw ApiError.internal(
        "AI provider is not configured. Set GEMINI_API_KEY in the server environment."
      );
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: env.ai.geminiApiKey,
      });

      const response = await ai.models.generateContent({
        model: env.ai.geminiModel,
        contents: `${systemPrompt}\n\n${userPrompt}`,
      });

      return response.text;
    } catch (err) {
  console.error(err);
  throw ApiError.internal(`AI provider request failed: ${err.message}`);
}
  }
}
console.log("API key prefix:", env.ai.geminiApiKey.substring(0, 10));
console.log("Model:", env.ai.geminiModel);
