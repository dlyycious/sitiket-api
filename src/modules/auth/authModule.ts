import type { FastifyInstance } from "fastify";
import { loginHandler } from "./handlers/loginHandler";
import { loginSchema, type IInLoginSchema } from "./schema/loginSchema";

export const authModule = (app: FastifyInstance) => {
  app.post<{ Body: IInLoginSchema }>("/", { schema: loginSchema }, loginHandler);
};
