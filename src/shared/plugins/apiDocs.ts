import fastifySwagger from "@fastify/swagger";
import scalar from "@scalar/fastify-api-reference";
import fp from "fastify-plugin";

export const apiDocs = fp(async (app) => {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "SiTiket API",
        description: "This is SiTiket API Endpoint Documentations",
        version: "0.0.1",
      },
    },
  });
  await app.register(scalar, {
    routePrefix: "/",
    configuration: { title: "Our API Reference", theme: "bluePlanet" },
  });
});
