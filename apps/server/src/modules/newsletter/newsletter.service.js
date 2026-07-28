import { Subscriber } from "./subscriber.model.js";
import { emailService } from "../../services/email/EmailService.js";

export async function subscribe({ email, name, source }) {
  const existing = await Subscriber.findOne({ email });
  if (existing) {
    if (existing.status === "unsubscribed") {
      existing.status = "subscribed";
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = undefined;
      await existing.save();
    }
    return existing;
  }

  const subscriber = await Subscriber.create({ email, name, source });
  await emailService.sendWelcomeEmail(email, name).catch(() => {});
  return subscriber;
}

export async function unsubscribe(email) {
  await Subscriber.updateOne(
    { email },
    { status: "unsubscribed", unsubscribedAt: new Date() }
  );
}
