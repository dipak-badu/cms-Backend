import dotenv, { config } from "dotenv";

config();
export const appConfig = {
  assetUrl: process.env.ASSET_URL || "http://localhost:9005/assets",
  jwtSecret: process.env.JWT_SECRET,
};

export const mongoConfig = {
  url: process.env.MONGODB_URL,
  name: process.env.NAME,
};

export const smptConfig = {
  provider: process.env.SMTP_PROVIDER,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FROM,
};
