import { toolRegistry } from "./toolRegistry.js";
import { AIService } from "../../services/ai/AIService.js";
import { calculatePricing } from "./etsy/pricingCalculator.logic.js";
import { calculateFees } from "./etsy/feeCalculator.logic.js";
import { History } from "../history/history.model.js";
import { User } from "../users/user.model.js";
import { ApiError } from "../../utils/ApiError.js";

const LOGIC_HANDLERS = {
  "etsy-pricing-calculator": calculatePricing,
  "etsy-fee-calculator": calculateFees,
};

function resetCreditsIfNewCycle(user) {
  if (user.credits.resetAt && user.credits.resetAt < new Date()) {
    user.credits.used = 0;
    const d = new Date();
    user.credits.resetAt = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  }
}

export async function runTool(toolId, input, user) {
  const tool = toolRegistry[toolId];
  if (!tool) throw ApiError.notFound(`Tool "${toolId}" does not exist`);

  // Logic tools (calculators) are free and instant — no credit check needed.
  if (tool.kind === "logic") {
    const handler = LOGIC_HANDLERS[toolId];
    const output = handler(input);
    if (user) {
      await History.create({
        userId: user._id,
        toolId,
        toolName: tool.name,
        marketplace: tool.marketplace,
        input,
        output,
        creditsCost: 0,
      });
    }
    return output;
  }

  // AI tools require an authenticated user with available credits.
  if (!user) throw ApiError.unauthorized("Please log in to use AI-powered tools");

  const freshUser = await User.findById(user._id);
  resetCreditsIfNewCycle(freshUser);

  const remaining = freshUser.credits.limit - freshUser.credits.used;
  if (remaining < tool.creditCost) {
    throw ApiError.forbidden(
      `You've used all your credits for this billing cycle (${freshUser.credits.limit}/month on the ${freshUser.plan} plan). Upgrade your plan for more.`
    );
  }

  const output = await AIService.generate(toolId, input);

  freshUser.credits.used += tool.creditCost;
  await freshUser.save();

  await History.create({
    userId: freshUser._id,
    toolId,
    toolName: tool.name,
    marketplace: tool.marketplace,
    input,
    output,
    creditsCost: tool.creditCost,
  });

  return output;
}
