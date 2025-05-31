import { fastify, type FastifyInstance } from "fastify";
import { config } from "./shared/config/appConfig";
import { configPlugin } from "./shared/plugins/appConfig";
import { dbContextPlugin } from "./shared/plugins/dbContext";
import { jwtPlugin } from "./shared/plugins/jwt";
import { utilPlugin } from "./shared/plugins/utility";
import { authenticateMiddleware } from "./shared/middlewares/authenticate";
import { authModule } from "./modules/auth/authModule";
import { apiDocs } from "./shared/plugins/apiDocs";
import { logger } from "./shared/config/logger";

const isDevelopment = process.env.NODE_ENV === "development";

const app: FastifyInstance = fastify({
  logger: isDevelopment
    ? logger
    : {
        level: "error",
      },
});

/* Register Plugin */
app.register(configPlugin);
app.register(utilPlugin);
app.register(dbContextPlugin);
app.register(jwtPlugin);
app.register(authenticateMiddleware);
await app.register(apiDocs);

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
  app.listen(config.server, () => {
    console.log(`App running at http://${config.server.host}:${config.server.port}`);
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
