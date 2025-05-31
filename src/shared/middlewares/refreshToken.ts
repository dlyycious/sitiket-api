import type { IInLogoutSchema } from "@/modules/auth/schema/logoutSchema";
import fp from "fastify-plugin";
import { MakeResponse } from "../utils/makeResponse";
import type { IJwtSchema } from "@/modules/auth/schema/jwtSchema";
export const refreshTokenPlugin = fp(async (app, opt) => {
  app.decorate("refreshTokenCheck", async (request, reply) => {
    try {
      const { refreshToken } = request.body as IInLogoutSchema;

      const jwtCheck = (await app.jwt.verify(refreshToken)) as IJwtSchema;

      if (!jwtCheck || jwtCheck.tokenType != "refresh") {
        return reply.code(401).send(MakeResponse.send(401, "Refresh token is invalid"));
      }
    } catch (err) {
      return reply.code(401).send(MakeResponse.withError(401, "Refresh token is invalid", err));
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    refreshTokenCheck: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}
