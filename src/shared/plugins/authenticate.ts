import fp from "fastify-plugin";
export const authenticatePlugin = fp(async (app, opt) => {
  app.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.code(401).send({
        statusCode: 401,
        message: "unauthorized",
      });
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}
