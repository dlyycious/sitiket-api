import postgres from "postgres";
import path from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "../config/appConfig";
import { defineConfig } from "drizzle-kit";

const registerModels = {};

const queryClient = postgres(config.database);

export const databaseContext = drizzle({ client: queryClient, schema: registerModels });

type IDatabaseContext = typeof databaseContext;

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    ssl: false,
    ...config.database,
  },
  migrations: {
    schema: "public",
    table: "__migrations",
  },
  schema: path.resolve(__dirname, "models"),
  out: path.resolve(__dirname, "migrations"),
  casing: "snake_case",
});
