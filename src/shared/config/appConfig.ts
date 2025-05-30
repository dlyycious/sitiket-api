import fs from "fs";
import path from "path";

export const config = {
  server: {
    host: "localhost",
    port: 8000,
  },
  database: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "secret123",
    database: "sitiket",
  },
  jwt: {
    private: fs.readFileSync(path.resolve(path.join(__dirname, "..", "keys", "private.key")), "utf-8") ?? "",
    public: fs.readFileSync(path.resolve(path.join(__dirname, "..", "keys", "public.key")), "utf-8") ?? "",
  },
};

export type IConfig = typeof config;
