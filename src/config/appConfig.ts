import dotenv, { config } from "dotenv";

config();
export const appConfig = {
  assetUrl: process.env.ASSET_URL || "http://localhost:9005/assets",
};

export const mongoConfig = {
  url: process.env.MONGODB_URL,
  name: process.env.NAME,
};
