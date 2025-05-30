import fp from "fastify-plugin";
import { config, type IConfig } from "@/shared/config/appConfig";

export const configPlugin = fp((app, opt, done) => {
  app.decorate("config", config);
  done();
});

declare module "fastify" {
  interface FastifyInstance {
    config: IConfig;
  }
}
