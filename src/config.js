import { config } from "dotenv";

config();

export const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost/crud-mongo";

export const PORT = process.env.PORT || 3000;
