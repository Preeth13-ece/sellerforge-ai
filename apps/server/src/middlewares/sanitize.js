import { filterXSS } from "xss";

function deepSanitize(obj) {
  if (typeof obj === "string") return filterXSS(obj, { whiteList: {} });
  if (Array.isArray(obj)) return obj.map(deepSanitize);
  if (obj && typeof obj === "object") {
    const clean = {};
    for (const key of Object.keys(obj)) clean[key] = deepSanitize(obj[key]);
    return clean;
  }
  return obj;
}

export function sanitizeInput(req, res, next) {
  if (req.body && typeof req.body === "object") req.body = deepSanitize(req.body);
  next();
}
