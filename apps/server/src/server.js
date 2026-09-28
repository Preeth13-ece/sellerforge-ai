import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";
import app from "./app.js";
import { scheduleTokenCleanup } from "./jobs/cleanupExpiredTokens.job.js";

async function start() {
  await connectDB();
  scheduleTokenCleanup();
  app.listen(env.port, () => {
    logger.info(`SellerForge AI API running on port ${env.port} [${env.nodeEnv}]`);
  });
}

start();
