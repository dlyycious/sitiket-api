import { Type, type Static } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

export const inLoginSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export const outLoginSuccessSchema = Type.Object(
  {
    statusCode: Type.Number(),
    message: Type.String(),
    data: Type.Object({
      accessToken: Type.String(),
      refreshToken: Type.String(),
    }),
  },
  { description: "login successfull" }
);

export const outLoginFailSchema = Type.Object(
  {
    statusCode: Type.Number(),
    message: Type.String(),
    error: Type.Optional(Type.Any()),
  },
  { description: "logout failed" }
);

export const loginSchema: FastifySchema = {
  summary: "Login",
  description: "Endpoint for login to get access and refresh token",
  tags: ["Auth"],
  body: inLoginSchema,
  response: {
    200: outLoginSuccessSchema,
    "4xx": outLoginFailSchema,
    500: outLoginFailSchema,
  },
};
export type IInLoginSchema = Static<typeof inLoginSchema>;
export type IOutLoginSuccessSchema = Static<typeof outLoginSuccessSchema>;
export type IOutLoginFailSchema = Static<typeof outLoginFailSchema>;
