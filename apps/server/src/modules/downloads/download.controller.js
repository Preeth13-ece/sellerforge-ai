import { Download } from "./download.model.js";
import { History } from "../history/history.model.js";
import { toCSV } from "../../services/export/csvExportService.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

function flattenForCSV(output) {
  // Handles both array-of-strings outputs and nested object outputs.
  if (Array.isArray(output)) return output.map((v, i) => ({ index: i + 1, value: v }));
  if (output && typeof output === "object") {
    const firstArrayKey = Object.keys(output).find((k) => Array.isArray(output[k]));
    if (firstArrayKey) {
      return output[firstArrayKey].map((v, i) => ({
        index: i + 1,
        value: typeof v === "object" ? JSON.stringify(v) : v,
      }));
    }
    return [output];
  }
  return [{ value: String(output) }];
}

export const listDownloads = asyncHandler(async (req, res) => {
  const downloads = await Download.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return new ApiResponse(200, { downloads }).send(res);
});

export const createDownload = asyncHandler(async (req, res) => {
  const { sourceHistoryId, fileType = "csv" } = req.body;
  const historyItem = await History.findOne({ _id: sourceHistoryId, userId: req.user._id });
  if (!historyItem) throw ApiError.notFound("History item not found");

  let content;
  if (fileType === "csv") {
    content = toCSV(flattenForCSV(historyItem.output));
  } else {
    content = JSON.stringify(historyItem.output, null, 2);
  }

  const download = await Download.create({
    userId: req.user._id,
    sourceHistoryId,
    fileType,
    fileName: `${historyItem.toolId}-${Date.now()}.${fileType}`,
    content,
  });

  return new ApiResponse(201, { download }, "Download ready").send(res);
});

export const getDownloadFile = asyncHandler(async (req, res) => {
  const download = await Download.findOne({ _id: req.params.id, userId: req.user._id });
  if (!download) throw ApiError.notFound("Download not found");

  const mime = download.fileType === "csv" ? "text/csv" : "application/json";
  res.setHeader("Content-Type", mime);
  res.setHeader("Content-Disposition", `attachment; filename="${download.fileName}"`);
  res.send(download.content);
});
