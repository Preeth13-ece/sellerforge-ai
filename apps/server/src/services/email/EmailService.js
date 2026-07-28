import { ResendProvider } from "./ResendProvider.js";
import { env } from "../../config/env.js";

const provider = new ResendProvider();

function wrapTemplate(title, bodyHtml) {
  return `
  <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
    <h1 style="color:#10b981;font-size:20px;margin-bottom:16px;">${title}</h1>
    <div style="color:#111827;font-size:15px;line-height:1.6;">${bodyHtml}</div>
    <p style="margin-top:32px;color:#9ca3af;font-size:12px;">SellerForge AI · Tools for Etsy sellers who want to grow faster.</p>
  </div>`;
}

export const emailService = {
  async sendVerificationEmail(to, name, token) {
    const url = `${env.clientUrl}/verify-email/${token}`;
    const html = wrapTemplate(
      "Verify your email",
      `<p>Hi ${name},</p><p>Confirm your email to activate your SellerForge AI account.</p>
       <p><a href="${url}" style="background:#10b981;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;">Verify email</a></p>`
    );
    return provider.send(to, "Verify your SellerForge AI account", html);
  },

  async sendPasswordResetEmail(to, name, token) {
    const url = `${env.clientUrl}/reset-password/${token}`;
    const html = wrapTemplate(
      "Reset your password",
      `<p>Hi ${name},</p><p>We received a request to reset your password. This link expires in 1 hour.</p>
       <p><a href="${url}" style="background:#10b981;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;">Reset password</a></p>
       <p>If you didn't request this, you can safely ignore this email.</p>`
    );
    return provider.send(to, "Reset your SellerForge AI password", html);
  },

  async sendWelcomeEmail(to, name) {
    const html = wrapTemplate(
      "Welcome to SellerForge AI",
      `<p>Hi ${name || "there"},</p><p>Thanks for subscribing! We'll send you Etsy SEO tips, product ideas, and product updates — no spam.</p>`
    );
    return provider.send(to, "Welcome to SellerForge AI", html);
  },
};
