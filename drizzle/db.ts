import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const ssl = {
  ca: fs.readFileSync(process.env.SSL_CA_PATH!).toString(),
  key: fs.readFileSync(process.env.SSL_KEY_PATH!).toString(),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH!).toString(),
  rejectUnauthorized: false, // Ensures the SSL certificate is properly verified
};
const client = postgres(process.env.DATABASE_URL as string, {
  ssl: ssl,
});

export const db = drizzle(client, { schema, logger: true });
