import { config } from "dotenv";

config();

const env = process.env;

// Get mongo url. If it can't find the url then it's mongodb://localhost/crud-mongo
const MONGODB_URL = env.MONGODB_URL || "mongodb://localhost/crud-mongo";

// Get port from .env. If it can't find the port then it's 3000
const PORT = env.PORT || 3000;

export { MONGODB_URL, PORT };
