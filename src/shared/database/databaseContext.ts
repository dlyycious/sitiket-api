import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "../config/appConfig";
import { defineConfig } from "drizzle-kit";

const registerModels = {};

const queryClient = postgres(config.database);

export const databaseContext = drizzle({ client: queryClient, schema: registerModels, casing: "snake_case" });

export type IDatabaseContext = typeof databaseContext;

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
  schema: "src/shared/database/models",
  out: "src/shared/database/migrations",
  casing: "snake_case",
});
