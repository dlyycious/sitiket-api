import type { FastifyInstance } from "fastify";
import { loginHandler } from "./handlers/loginHandler";
import { loginSchema } from "./schema/loginSchema";

export const authModule = (app: FastifyInstance) => {
  app.post("/", { schema: loginSchema }, loginHandler);
};
