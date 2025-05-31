import * as t from "drizzle-orm/pg-core";

export const RevokeToken = t.pgTable("revoke_tokens", {
  jti: t.varchar().primaryKey().notNull(),
  revokeAt: t.timestamp().$defaultFn(() => new Date()),
});
