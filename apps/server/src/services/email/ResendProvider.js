import { env } from "../../config/env.js";
import { logger } from "../../utils/logger.js";
import { EmailProviderInterface } from "./EmailProvider.interface.js";

const RESEND_URL = "https://api.resend.com/emails";

export class ResendProvider extends EmailProviderInterface {
  async send(to, subject, html) {
    if (!env.email.apiKey) {
      logger.warn(`[email] EMAIL_PROVIDER_API_KEY not set — skipping send to ${to}: "${subject}"`);
      return { skipped: true };
    }

    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.email.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from: env.email.from, to, subject, html }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      logger.error(`[email] Send failed (${response.status}): ${text.slice(0, 300)}`);
      throw new Error("Email send failed");
    }

    return response.json();
  }
}
