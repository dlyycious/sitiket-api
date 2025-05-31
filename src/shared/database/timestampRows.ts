import { timestamp } from "drizzle-orm/pg-core";

export const timestampRows = {
  createdAt: timestamp()
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
  deletedAt: timestamp(),
};
