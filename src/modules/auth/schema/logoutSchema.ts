import { Type, type Static } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

export const inLogoutSchema = Type.Object({
  refreshToken: Type.String(),
});

export const outLogoutSchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.Number(),
});

export const outLogoutErrorSchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.Number(),
  error: Type.Optional(Type.Any()),
});

export const logoutSchema: FastifySchema = {
  summary: "Logout",
  description: "Endpoint for logout user by revoking refresh token",
  tags: ["Auth"],
  body: inLogoutSchema,
  response: {
    200: outLogoutSchema,
    "4xx": outLogoutSchema,
    500: outLogoutErrorSchema,
  },
};

export type IInLogoutSchema = Static<typeof inLogoutSchema>;
export type IOutLogoutSchema = Static<typeof outLogoutSchema>;
export type IOutLogoutErrorSchema = Static<typeof outLogoutErrorSchema>;
