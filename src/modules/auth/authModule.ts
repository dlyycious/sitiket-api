import type { FastifyInstance } from "fastify";
import { loginHandler } from "./handlers/loginHandler";
import { loginSchema } from "./schema/loginSchema";
import { logoutHandler } from "./handlers/logoutHandler";
import { logoutSchema } from "./schema/logoutSchema";

export const authModule = (app: FastifyInstance) => {
  app.post("/", { schema: loginSchema }, loginHandler);
  app.delete("/", { schema: logoutSchema, preHandler: app.refreshTokenCheck }, logoutHandler);
};
