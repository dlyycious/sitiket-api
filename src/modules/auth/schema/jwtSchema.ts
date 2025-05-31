import { Type, type Static } from "@sinclair/typebox";

export enum tokenType {
  refresh,
  access,
}

export const jwtSchema = Type.Object({
  id: Type.String(),
  username: Type.String(),
  email: Type.String(),
  tokenType: Type.Union([Type.Literal("access"), Type.Literal("refresh")]),
  jti: Type.String(),
  aud: Type.String(),
  exp: Type.String(),
  iat: Type.String(),
});

export type IJwtSchema = Static<typeof jwtSchema>;
