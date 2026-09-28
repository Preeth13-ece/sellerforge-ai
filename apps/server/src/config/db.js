import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDB() {
  if (!env.mongoUri) {
    logger.warn("MONGODB_URI not set — skipping DB connection.");
    return;
  }
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
}
