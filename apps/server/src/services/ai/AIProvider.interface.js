/**
 * Interface every AI provider must implement.
 * Swapping providers (Anthropic -> OpenAI -> local model) means writing one
 * new class that implements `complete()` — nothing else in the app changes.
 */
export class AIProviderInterface {
  /**
   * @param {string} systemPrompt
   * @param {string} userPrompt
   * @returns {Promise<string>} raw text completion
   */
  async complete(systemPrompt, userPrompt) {
    throw new Error("complete() not implemented");
  }
}
