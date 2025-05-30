import { fastify, type FastifyInstance } from "fastify";
import { config } from "./shared/config/appConfig";
import { configPlugin } from "./shared/plugins/appConfig";
import { dbContextPlugin } from "./shared/plugins/dbContext";
import { jwtPlugin } from "./shared/plugins/jwt";
import { utilPlugin } from "./shared/plugins/utility";
import { logger } from "./shared/config/logger";
import { authenticatePlugin } from "./shared/plugins/authenticate";
import { authModule } from "./modules/auth/authModule";
import { apiDocs } from "./shared/plugins/apiDocs";

const app: FastifyInstance = fastify({ logger });

/* Register Plugin */
app.register(configPlugin);
app.register(utilPlugin);
app.register(dbContextPlugin);
app.register(jwtPlugin);
app.register(authenticatePlugin);
await app.register(apiDocs);

/* Hook Configuration */
app.addHook("onRequest", async (req, rep) => {
  if (process.env.NODE_ENV == "production") {
    const acceptHeader = req.headers["accept"];
    if (acceptHeader != "application/json") {
      return rep.code(406).send({
        statusCode: 406,
        message: "Server only accept application/json",
        error: "Not Acceptable",
      });
    }
  }
});

/* Register Routes */
app.register(authModule, { prefix: "/auth" });

/* Error Handling */
app.setErrorHandler((error, req, rep) => {
  if (error.validation) {
    return rep.code(400).send({
      statusCode: 400,
      message: error,
    });
  }
});

app.setNotFoundHandler((req, rep) => {
  return rep.code(404).send({
    status: 404,
    message: `Route ${req.url} not Found`,
    error: "Page not Found",
  });
});

try {
  app.listen(config.server);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
