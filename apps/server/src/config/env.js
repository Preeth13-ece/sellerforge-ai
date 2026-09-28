import dotenv from "dotenv";

dotenv.config();

const required = [
  "MONGODB_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length && process.env.NODE_ENV !== "test") {
    console.warn(
      `[env] Missing recommended environment variables: ${missing.join(", ")}. ` +
        `The server will still boot, but related features will fail until these are set.`
    );
  }
}

validateEnv();


export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  clientUrl:
    process.env.CLIENT_URL || "http://localhost:5173",

  mongoUri: process.env.MONGODB_URI,


  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn:
      process.env.JWT_ACCESS_EXPIRES_IN || "15m",

    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },


  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY,

    geminiModel:
      process.env.GEMINI_MODEL || "gemini-2.5-flash",
  },


  email: {
    apiKey: process.env.EMAIL_PROVIDER_API_KEY,

    from:
      process.env.EMAIL_FROM ||
      "SellerForge AI <hello@sellerforgeai.com>",
  },


  // Old Stripe config (can remove later)
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    pricePro: process.env.STRIPE_PRICE_PRO,
    priceBusiness: process.env.STRIPE_PRICE_BUSINESS,
  },


  // Razorpay subscription config
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,

    keySecret:
      process.env.RAZORPAY_KEY_SECRET,

    planPro:
      process.env.RAZORPAY_PLAN_PRO,

    planBusiness:
      process.env.RAZORPAY_PLAN_BUSINESS,
  },


  credits: {
    free:
      Number(process.env.FREE_PLAN_CREDIT_LIMIT) || 20,

    pro:
      Number(process.env.PRO_PLAN_CREDIT_LIMIT) || 500,

    business:
      Number(process.env.BUSINESS_PLAN_CREDIT_LIMIT) || 999999,
  },
};