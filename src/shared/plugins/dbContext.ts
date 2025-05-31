import fp from "fastify-plugin";
import { databaseContext, type IDatabaseContext } from "../database/databaseContext";

export const dbContextPlugin = fp(async (app, opt) => {
  app.decorate("db", databaseContext);
});

declare module "fastify" {
  interface FastifyInstance {
    db: IDatabaseContext;
  }
}
