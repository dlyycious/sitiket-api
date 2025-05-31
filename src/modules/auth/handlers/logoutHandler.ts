import { MakeResponse } from "@/shared/utils/makeResponse";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { IInLogoutSchema } from "../schema/logoutSchema";
import type { IJwtSchema } from "../schema/jwtSchema";
import { eq } from "drizzle-orm";
import { RevokeToken } from "@/shared/database/models/revokeToken";

export async function logoutHandler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  try {
    const { refreshToken } = request.body as IInLogoutSchema;

    const decodeRefresh = (await this.jwt.verify(refreshToken)) as IJwtSchema;

    const refresh = await this.db.query.RevokeToken.findFirst({ where: eq(RevokeToken.jti, decodeRefresh.jti) });

    if (refresh) {
      return reply.code(400).send(MakeResponse.send(400, "Token has revoked"));
    }

    await this.db.insert(RevokeToken).values({
      jti: decodeRefresh.jti,
    });

    return reply.code(200).send(MakeResponse.send(200, "Logout Successfull"));
  } catch (err) {
    return reply.code(500).send(MakeResponse.withError(500, "Internal Server Error", err));
  }
}
