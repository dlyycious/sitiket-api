import fp from "fastify-plugin";
import { generateUUID } from "../utils/uuidGenerator";

const utilRegister = {
  generateUUID,
};

export const utilPlugin = fp((app, opt, done) => {
  app.decorate("util", utilRegister);
  done();
});

declare module "fastify" {
  interface FastifyInstance {
    util: typeof utilRegister;
  }
}
