import cron from "node-cron";
import { User } from "../modules/users/user.model.js";
import { logger } from "../utils/logger.js";

// Runs daily at 03:00 — prunes refresh tokens that expired more than a day ago.
export function scheduleTokenCleanup() {
  cron.schedule("0 3 * * *", async () => {
    try {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const result = await User.updateMany(
        {},
        { $pull: { refreshTokens: { expiresAt: { $lt: cutoff } } } }
      );
      logger.info(`[cron] Cleaned expired refresh tokens on ${result.modifiedCount} users`);
    } catch (err) {
      logger.error(`[cron] Token cleanup failed: ${err.message}`);
    }
  });
}
