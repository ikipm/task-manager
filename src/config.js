import { config } from "dotenv";

config();

// Get mongo url. If it can't find the url then it's mongodb://localhost/crud-mongo
export const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost/crud-mongo";

// Get port from .env. If it can't find the port then it's 3000
export const PORT = process.env.PORT || 3000;
