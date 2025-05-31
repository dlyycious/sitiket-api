import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { IInLoginSchema } from "../schema/loginSchema";
import { MakeResponse } from "@/shared/utils/makeResponse";
import { eq } from "drizzle-orm";
import { User } from "@/shared/database/models/user";
import { generateUUID } from "@/shared/utils/uuidGenerator";

const createToken = (
  app: FastifyInstance,
  payload: { id: string; username: string; email: string },
  type: "access" | "refresh"
): string => {
  const token = app.jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      tokenType: type,
    },
    {
      jti: generateUUID(),
      iss: "WhoisDlyy",
      aud: "siTiket",
      expiresIn: type == "access" ? "1h" : "30d",
    }
  );

  return token;
};

export async function loginHandler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as IInLoginSchema;

    const isDevelopment = process.env.NODE_ENV === "development";

    const user = await this.db.query.User.findFirst({
      where: eq(User.id, email),
    });
    if (!user) {
      return reply
        .code(400)
        .send(
          MakeResponse.withError(400, "Email or Password is invalid", isDevelopment ? "Email is not found" : undefined)
        );
    }

    const passwordVerify = await Bun.password.verify(user.password, password);

    if (!passwordVerify) {
      return reply
        .code(400)
        .send(
          MakeResponse.withError(400, "Email or Password is invalid", isDevelopment ? "Password is wrong" : undefined)
        );
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = createToken(this, payload, "access");
    const refreshToken = createToken(this, payload, "refresh");

    return reply.code(200).send(
      MakeResponse.withData(200, "Login Sucessfull", {
        accessToken,
        refreshToken,
      })
    );
  } catch (err) {
    return reply.code(500).send(MakeResponse.withError(500, "Internal Server Error", err));
  }
}
