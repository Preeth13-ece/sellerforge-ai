import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listToolsMetadata } from "./toolRegistry.js";
import { runTool } from "./tools.service.js";

export const listTools = asyncHandler(async (req, res) => {
  return new ApiResponse(200, { tools: listToolsMetadata() }).send(res);
});

export const runToolHandler = (toolId) =>
  asyncHandler(async (req, res) => {
    const output = await runTool(toolId, req.body, req.user);
    return new ApiResponse(200, { toolId, output }, "Generated successfully").send(res);
  });
