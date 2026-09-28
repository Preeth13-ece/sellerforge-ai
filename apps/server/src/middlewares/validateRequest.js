import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => `${e.path}: ${e.msg}`);
    return next(ApiError.badRequest("Validation failed", errors));
  }
  next();
}
