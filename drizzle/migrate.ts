import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
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
const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 100,
  ssl: ssl,
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle/migrations",
  });

  await migrationClient.end();
}
main();
