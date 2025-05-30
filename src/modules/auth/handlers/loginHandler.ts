import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { IInLoginSchema } from "../schema/loginSchema";
import { MakeResponse } from "@/shared/utils/makeResponse";

export async function loginHandler(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as IInLoginSchema;

  if (email != "fadli.aqil12@gmail.com" || password != "fadliaqilganteng") {
    return reply.code(400).send(MakeResponse.send(400, "Email or Password is invalid"));
  }

  const token = await this.jwt.sign(
    {},
    {
      iss: "WhoisDlyy",
      aud: "SiTiket",
      sub: email,
    }
  );

  return reply.code(200).send(MakeResponse.withData(200, "Login Sucessfull", token));
}
