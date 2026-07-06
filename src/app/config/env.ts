import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL!,

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN! || "7d",

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,

  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
};

export default envConfig;