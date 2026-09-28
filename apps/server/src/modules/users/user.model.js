import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userAgent: String,
    expiresAt: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatarUrl: { type: String, default: "" },

    isEmailVerified: { type: Boolean, default: false },
    emailVerifyTokenHash: { type: String, select: false },
    emailVerifyExpires: Date,

    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: Date,

    refreshTokens: { type: [refreshTokenSchema], default: [], select: false },

    plan: { type: String, enum: ["free", "pro", "business"], default: "free" },
    credits: {
      used: { type: Number, default: 0 },
      limit: { type: Number, default: 20 },
      resetAt: { type: Date, default: () => nextMonthStart() },
    },

    status: { type: String, enum: ["active", "suspended", "deleted"], default: "active" },
  },
  { timestamps: true }
);

function nextMonthStart() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.refreshTokens;
  delete obj.emailVerifyTokenHash;
  delete obj.passwordResetTokenHash;
  return obj;
};

export const User = mongoose.model("User", userSchema);
