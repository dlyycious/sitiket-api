import { Type, type Static } from "@sinclair/typebox";
import type { FastifySchema } from "fastify";

export const inLoginSchema = Type.Object({
  email: Type.String({ format: "email", minLength: 8, maxLength: 25 }),
  password: Type.String({ minLength: 8, maxLength: 16 }),
});

export const outLoginSuccessSchema = Type.Object(
  {
    statusCode: Type.Number({ examples: [200] }),
    message: Type.String({ examples: ["Login Successfull"] }),
    data: Type.String({ examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0...0w5c"] }),
  },
  { description: "Response if Login Successfull" }
);

export const outLoginFailSchema = Type.Object({
  statusCode: Type.Number({ examples: [400] }),
  message: Type.String({ examples: ["Email or Password is invalid"] }),
});

export const loginSchema: FastifySchema = {
  summary: "Login",
  description: "Endpoint for Login",
  tags: ["Auth"],
  body: inLoginSchema,
  response: {
    200: outLoginSuccessSchema,
    "4xx": outLoginFailSchema,
  },
};
export type IInLoginSchema = Static<typeof inLoginSchema>;
export type IOutLoginSuccessSchema = Static<typeof outLoginSuccessSchema>;
export type IOutLoginFailSchema = Static<typeof outLoginFailSchema>;
