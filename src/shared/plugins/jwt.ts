import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
export const jwtPlugin = fp((app, opt, done) => {
  app.register(fastifyJwt, {
    secret: app.config.jwt,
    sign: {
      algorithm: "RS256",
    },
    verify: {
      algorithms: ["RS256"],
      allowedIss: "WhoisDlyy",
      allowedAud: ["siTiket"],
    },
  });
  done();
});
