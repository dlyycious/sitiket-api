import fp from "fastify-plugin";
import { databaseContext } from "../database/databaseContext";

export const dbContextPlugin = fp(async (app, opt) => {
  app.decorate("db", databaseContext);
});

declare module "fastify" {
  interface FastifyInstance {
    db: typeof databaseContext;
  }
}
